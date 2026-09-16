export function Honeypot() {
  return (
    <div
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <label htmlFor="website_url">Do not fill this out if you are human</label>
      <input
        type="text"
        id="website_url"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
