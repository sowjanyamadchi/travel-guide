import './index.css'

const TravelListCard = props => {
  const {cardDetails} = props

  const {description, imageUrl, name} = cardDetails

  console.log(cardDetails)

  return (
    <li className="travel-card">
      <img src={imageUrl} alt={name} className="travel-image" />
      <div className="name-and-description">
        <h1 className="travel-card-heading">{name}</h1>
        <p className="travel-card-description">{description}</p>
      </div>
    </li>
  )
}

export default TravelListCard
