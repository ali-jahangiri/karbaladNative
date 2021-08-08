import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { EmptyChat , AdminMessage , UserMessage } from './index';

const MessageDirectory = ({ items , focusForNewMessageInEmptyState}) => {
    const containerRef = useRef();
    
    const haveItemsForShow = !items.length;

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={{ flex : haveItemsForShow ? 1 : 0 , paddingBottom : !haveItemsForShow ? 10 : 0 }} ref={containerRef} onContentSizeChange={() => containerRef.current.scrollToEnd({animated: true})}>
                {
                    haveItemsForShow ? <EmptyChat focusForNewMessageInEmptyState={focusForNewMessageInEmptyState} /> : items.map((el , i) => {
                        if(el.fromAdmin) return <UserMessage message={el.message} key={i} time={dayjs(el.createTime).calendar('jalali').locale('fa').format('YYYY/MM/DD')} />
                        else return <AdminMessage key={i} message={el.message} time={dayjs(el.createTime).calendar('jalali').locale('fa').format("YYYY/MM/DD")} />
                    })
                }
            </ScrollView>
        </View>
    )
}

const style =  StyleSheet.create({
    container : { flex: 1,}
})

export default MessageDirectory;