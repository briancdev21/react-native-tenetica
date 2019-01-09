import React, {Component} from 'react'
import {FlatList, View} from 'react-native'
import {connect} from 'react-redux'
import debounce from 'lodash.debounce'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

import {searchBusinesses} from './actions'
import {geoLocationCoordsSelector} from 'src/components/GeoLocation/selectors'
import {
  businessSearchValueSelector,
  businessDataSelector,
  businessCategoriesDataSelector,
  businessTotalMetaSelector,
  businessCurrentPageMetaSelector,
  businessSearchLoadingStatusSelector
} from './selectors'

import {BusinessCategoriesList} from './components/BusinessCategoriesList'
import BusinessCard from './components/BusinessCard'

import SearchHeader from './SearchHeader'

// TODO: connect to map coordinates

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state),
  searchValue: businessSearchValueSelector(state),
  businesses: businessDataSelector(state),
  categories: businessCategoriesDataSelector(state),
  total: businessTotalMetaSelector(state),
  page: businessCurrentPageMetaSelector(state),
  searching: businessSearchLoadingStatusSelector(state)
})
const mapDispatchToProps = {
  searchBusinesses
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class BusinessSearch extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.searchValue) {
      return {
        ...prevState,
        searchValue: nextProps.searchValue
      }
    }

    return null
  }

  state = {
    searchValue: ''
  }

  componentDidUpdate (prevProps) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.searchBusinesses()
    }
  }

  searchBusinesses = debounce(async (nextPage) => {
    const {
      userLocation,
      mapCoords,
      searchValue,
      searchBusinesses,
      page = 1
    } = this.props

    const coords = mapCoords || userLocation
    const searchPage = nextPage || page

    searchBusinesses(searchValue, searchPage, coords)
  }, 1000)

  keyExtractor = business => String(business.id)

  loadMoreBusinesses = () => {
    const {page} = this.props

    const {
      businesses,
      total
    } = this.props

    const hasMoreItemsToLoad = businesses.length < total

    if (!hasMoreItemsToLoad) {
      return
    }

    this.searchBusinesses(page + 1)
  }

  renderListHeader = () => {
    const {searchValue, categories} = this.props

    return (
      <>
        <BusinessCategoriesContainer>
          <SectionTitle>Categories</SectionTitle>

          <BusinessCategoriesList searchValue={searchValue} categories={categories} />
        </BusinessCategoriesContainer>

        <View>
          <SectionTitle>Businesses</SectionTitle>
        </View>
      </>
    )
  }

  renderBusinessCard = ({item: business}) => {
    return (
      <BusinessCard
        {...business}
        style={{marginBottom: 20}}
      />
    )
  }

  render () {
    const {businesses} = this.props

    return (
      <Container>
        <SearchHeader
          isFocused
          inversed
          withBack
        />

        <FlatList
          contentContainerStyle={{paddingHorizontal: 15, borderTopColor: '#E9EAEF', borderTopWidth: 2}}
          data={businesses}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderBusinessCard}
          ListHeaderComponent={this.renderListHeader}
          onEndReached={this.loadMoreBusinesses}
          onEndReachedThreshold={0}
        />
      </Container>
    )
  }
}

// //
const Container = styled.View`
  flex: 1;
  background-color: #FFF;
`

const SectionTitle = styled(StyledText)`
  color: #BCBDC2;
  font-size: 22px;
  font-weight: 700;
  margin-vertical: 20px;
`

const BusinessCategoriesContainer = styled.View`
  border-bottom-color: #E9EAEF;
  border-bottom-width: 2px;
  padding-bottom: 20px;
`
