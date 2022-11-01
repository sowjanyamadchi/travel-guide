import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelListCard from '../TravelListCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TravelGuideHome extends Component {
  state = {
    travelList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTravelCardsList()
  }

  getTravelCardsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedData = data.packages.map(eachCard => ({
      id: eachCard.id,
      description: eachCard.description,
      imageUrl: eachCard.image_url,
      name: eachCard.name,
    }))
    console.log(updatedData)
    this.setState({
      travelList: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoaderView = () => (
    <div testid="loader" className="loader-spinner">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPageDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderTravelList()
      default:
        return null
    }
  }

  renderTravelList = () => {
    const {travelList} = this.state

    return (
      <div className="container">
        <ul className="travel-list">
          {travelList.map(travelCard => (
            <TravelListCard key={travelCard.id} cardDetails={travelCard} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="Travel-guide-home">
        <h1 className="Travel-guide-heading">Travel Guide</h1>
        {this.renderPageDetails()}
      </div>
    )
  }
}

export default TravelGuideHome