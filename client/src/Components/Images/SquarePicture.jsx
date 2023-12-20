export const SquarePicture = ({ className = '', source, size, alt = '', borderRadius = 0 }) => {
  return (
      <img
        className={className} 
        src={source} 
        alt={alt}
        style={{
        height: size, 
        width: size,
        borderRadius: borderRadius, 
        }} />
  )
}