export default function LoadingButton(props) {
  const className = props.className || 'btn-primary';

  const buttonProps = { ...props };
  delete buttonProps.loading;

  return props.loading
    ? (
      <button className={`btn ${className}`} type="button" disabled>
        {props.children}
      </button>
    )
    : <button {...buttonProps} className={`btn ${className}`}>{props.children}</button>
}