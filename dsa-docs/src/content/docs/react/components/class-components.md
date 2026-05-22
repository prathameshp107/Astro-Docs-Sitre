---
title: "Class Components"
description: "Legacy React components written with JavaScript classes."
---
# Class Components
Class components were common before Hooks. They extend `React.Component` and use a `render()` method.
```jsx
class Welcome extends React.Component {
 render() {
 return <h1>Hello {this.props.name}</h1>;
 }
}
```
## Key Points
- Uses `this.props` and `this.state`
- Supports lifecycle methods like `componentDidMount`
- Mostly found in older codebases
- Avoid for new components unless maintaining legacy code
Functional components with Hooks can handle the same use cases with less code.