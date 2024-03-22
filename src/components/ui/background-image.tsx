interface BackgroundImageProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  bg: string;
}

function BackgroundImage({
  bg,
  style,
  children,
  ...rest
}: BackgroundImageProps) {
  return (
    <div style={{ backgroundImage: `url(${bg})`, ...style }} {...rest}>
      {children}
    </div>
  );
}

export { BackgroundImage };
