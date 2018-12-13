import React from 'react'
import {
    ListView,
    StyleSheet,
    RefreshControl,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native'
// import {observer} from 'mobx-react/native'
import WBColor from '../common/HelperColors'

const styles = StyleSheet.create({
    root:{
        backgroundColor:WBColor.backgroundColor
    }
})

// @observer
export default class ItemList extends React.Component {

    componentDidMount() {
        // this.props.listRequest.refreshPage()
    }

    _renderRow = (item) => {
        return <this.props.item.component style={this.props.item.style} data={item.item} args={this.props.item.args}/>
    }

    _renderRefreshControl = () => {
        return (
            <RefreshControl
                // refreshing = {this.props.listRequest.isRefresh}
                // onRefresh = {this.props.listRequest.refreshPage}
            />
            )
    }

    _renderFooter = () => {
        // if(this.props.listRequest.isOver) {
            return <View/>
        // }
        return <ActivityIndicator/>
    }

    _onEndReached = () => {
        // if(!this.props.listRequest.isOver) {
            // this.props.listRequest.loadNextPage()
        // }
    }

    render () {
        // let dataSource = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2})
        // dataSource.cloneWithRows(data.slice())

        return (
            <FlatList
                style = {[styles.root, this.props.style]}
                // dataSource = {this.props.listRequest.dataSource}
                data = {this.props.data}
                // renderRow = {(rowData, sectionID, rowID)=>this._renderRow(rowData, sectionID, rowID)}
                renderItem = {this._renderRow}
                keyExtractor = {(item,idx)=>idx.toString()}
                //下拉
                refreshControl = {this._renderRefreshControl()}
                //上拉
                // renderFooter = {()=>this._renderFooter()}
                //页面滚动底部时，自动触发
                onEndReached = {()=>this._onEndReached()}
            />
        )
    }
}