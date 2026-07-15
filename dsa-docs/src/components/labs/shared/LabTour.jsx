import { useState, useEffect } from "react";

export default function LabTour({
  steps = [],
  tourKey = "labs-onboarding-tour-completed",
  onComplete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [rect, setRect] = useState(null);

  // Check if tour was already completed
  useEffect(() => {
    try {
      const completed = localStorage.getItem(tourKey);
      if (!completed && steps.length > 0) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, [tourKey, steps]);

  // Compute bounding rect of target element for spotlight
  useEffect(() => {
    if (!isOpen || steps.length === 0) return;

    const step = steps[currentStep];
    if (!step || !step.target) {
      setRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(step.target);
      if (el) {
        // Ensure element is visible/scrolled into viewport area
        el.scrollIntoView({ block: "nearest", inline: "nearest" });
        setRect(el.getBoundingClientRect());
      } else {
        setRect(null);
      }
    };

    updateRect();
    
    // Add small delay to account for layouts/sidebar resizing
    const timer = setTimeout(updateRect, 100);

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [currentStep, isOpen, steps]);

  if (!isOpen || steps.length === 0) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleComplete = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(tourKey, "true");
    } catch {
      // ignore
    }
    if (onComplete) onComplete();
  };

  // Determine smart coordinates for the floating dialog to avoid screen overflow
  const getDialogStyle = () => {
    if (!rect) {
      // Center in screen if no element target
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "fixed",
      };
    }

    const margin = 12;
    const dialogHeight = 180; // approximate
    const dialogWidth = 320;
    
    let top = rect.bottom + margin;
    let left = rect.left;

    // Adjust horizontal position to avoid right boundary overflow
    if (left + dialogWidth > window.innerWidth) {
      left = window.innerWidth - dialogWidth - 24;
    }
    left = Math.max(16, left);

    // If it overflows bottom, place it above the highlighted element
    if (top + dialogHeight > window.innerHeight) {
      top = rect.top - dialogHeight - margin;
    }

    return {
      top: `${Math.max(16, top)}px`,
      left: `${left}px`,
      position: "fixed",
    };
  };

  return (
    <>
      {/* Dynamic spotlight cutout overlay */}
      {rect && (
        <div
          className="lab-tour-highlight"
          style={{
            top: `${rect.top - 6}px`,
            left: `${rect.left - 6}px`,
            width: `${rect.width + 12}px`,
            height: `${rect.height + 12}px`,
          }}
        />
      )}

      {/* Backdrop when no rect is present (initial start modal) */}
      {!rect && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3, 7, 18, 0.75)",
            zIndex: 99998,
          }}
          onClick={handleComplete}
        />
      )}

      {/* Onboarding Dialog Card */}
      <div className="lab-tour-dialog" style={getDialogStyle()}>
        <div className="lab-tour-header">
          <span className="lab-tour-title">{step.title}</span>
          <span className="lab-tour-step-indicator">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
        <div className="lab-tour-body">{step.content}</div>
        <div className="lab-tour-footer">
          <button className="lab-tour-btn-skip" onClick={handleComplete}>
            Skip tour
          </button>
          <div className="lab-tour-actions">
            {currentStep > 0 && (
              <button
                className="lab-tour-btn lab-tour-btn-secondary"
                onClick={handlePrev}
              >
                Back
              </button>
            )}
            <button
              className="lab-tour-btn lab-tour-btn-primary"
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
