import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Layout, Text } from '@ui-kitten/components'

export class Loading extends Component {
    render() {
        return (
            <Layout style={styles.container} >
                <ActivityIndicator size="large" color="#ffffff" />
                <Text>Loading...</Text>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading