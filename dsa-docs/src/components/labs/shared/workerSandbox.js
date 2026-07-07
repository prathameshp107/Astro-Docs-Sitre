export function runCodeInSandbox(code, onLog, onFinished, timeoutMs = 2500) {
  const workerCode = `
    self.fetch = undefined;
    self.XMLHttpRequest = undefined;
    self.importScripts = undefined;

    self.onmessage = (e) => {
      const { code } = e.data;
      const sendLog = (type, args) => {
        const content = args.map(a => {
          try {
            return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a);
          } catch (err) {
            return String(a);
          }
        }).join(' ');
        self.postMessage({ type: 'log', logType: type, content });
      };
      
      const origLog = console.log;
      console.log = (...args) => sendLog('log', args);
      console.error = (...args) => sendLog('error', args);
      console.warn = (...args) => sendLog('warn', args);

      try {
        const result = new Function(code)();
        if (result !== undefined) {
          self.postMessage({ type: 'result', content: typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result) });
        }
        self.postMessage({ type: 'done' });
      } catch (err) {
        self.postMessage({ type: 'error', content: err.message });
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const workerURL = URL.createObjectURL(blob);
  const worker = new Worker(workerURL);
  
  let timer = setTimeout(() => {
    worker.terminate();
    URL.revokeObjectURL(workerURL);
    onLog('error', 'Time Limit Exceeded (Possible Infinite Loop)');
    onFinished();
  }, timeoutMs);

  worker.onmessage = (e) => {
    if (e.data.type === 'log') {
      onLog(e.data.logType, e.data.content);
    } else if (e.data.type === 'result') {
      onLog('result', e.data.content);
    } else if (e.data.type === 'error') {
      clearTimeout(timer);
      onLog('error', `✗ ${e.data.content}`);
      worker.terminate();
      URL.revokeObjectURL(workerURL);
      onFinished();
    } else if (e.data.type === 'done') {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(workerURL);
      onFinished();
    }
  };

  worker.postMessage({ code });

  return () => {
    clearTimeout(timer);
    worker.terminate();
    URL.revokeObjectURL(workerURL);
  };
}
