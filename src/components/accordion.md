```jsx
const Demo = () => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <Accordion
      title="Accordion Title"
      isExpanded={showDetails}
      onToggle={() => setShowDetails(!showDetails)}
    >
      <p>Some content</p>
    </Accordion>
  );
};

<Demo />;
```
