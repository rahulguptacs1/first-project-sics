function WithStyles({ description, headline, image }) {
  return (
    <div
      style={{
        userSelect: "none",
      }}
    >
      <p>{headline}</p>
      <p>{description}</p>
      <img
        src={image}
        style={{
          userSelect: "none",
        }}
        draggable={false}
      />
    </div>
  );
}

export default WithStyles;
