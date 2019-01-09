import React from 'react'
import {FlatList, View} from 'react-native'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

import {theme} from 'src/theme'

export class BusinessCategoriesList extends React.Component {
  render() {
    const {categories, searchValue} = this.props

    return (
      !!categories.length &&
      !!searchValue.trim().length && (
        <FlatList
          contentContainerStyle={{padding: 15}}
          data={categories}
          keyExtractor={category => category.name}
          renderItem={this.renderCategoryItem}
        />
      )
    )
  }

  renderCategoryItem = ({item: {name}}) => (
    <View style={{flexDirection: 'row', marginBottom: 10}}>
      <SearchValue>{this.props.searchValue}</SearchValue>
      <Category> in {name}</Category>
    </View>
  )
}

const SearchValue = styled(StyledText)`
  color: ${theme.colors.darkBlue};
  font-size: 17px;
  font-weight: 700;
`

const Category = styled(StyledText)`
  color: #bcbdc2;
  font-size: 17px;
  font-weight: 700;
`
