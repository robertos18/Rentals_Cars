const Fragment = props => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
};

export default Fragment;