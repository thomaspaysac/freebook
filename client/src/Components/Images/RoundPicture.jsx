export const RoundPicture = ({ className = '', source, radius, alt = '' }) => {
  return (
      <img
        className={className} 
        src={source} 
        alt={alt}
        style={{
        height: radius, 
        width: radius,
        borderRadius: '50%', 
        }} />
  )
}