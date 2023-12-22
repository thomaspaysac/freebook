export const RoundPicture = ({ className = '', source, radius, alt = '' }) => {
  return (
      <div className={className}
      style={{
        height: radius, 
        minWidth: radius,
        borderRadius: '50%',
      }}>
        <img
         src={source} 
         alt={alt}
         style={{
         height: '100%',
         width: '100%',
         objectFit:'cover',
         borderRadius: '50%',
         }} />
      </div>
      
  )
}