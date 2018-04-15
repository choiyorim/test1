import React from 'react';
import { View, Text, Button, Animated, RefreshControl, Platform, StatusBar} from 'react-native';
import styles from "./HomeStyles";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class HomeScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false,
        };
    }

    _renderScrollViewContent() {
        const data = Array.from({ length: 30 });
        return (
            <View style={styles.scrollViewContent}>
                {data.map((_, i) => (
                    <View key={i} style={styles.row}>
                        <Text>{i}</Text>
                    </View>
                ))}
            </View>
        );
    }


    render(){
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );

        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.8],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });

        return(
            <View style={styles.fill}>
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <Animated.ScrollView
                    style={styles.fill}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                setTimeout(() => this.setState({ refreshing: false }), 1000);
                            }}
                            // Android offset for RefreshControl
                            progressViewOffset={HEADER_MAX_HEIGHT}
                        />
                    }
                    // iOS offset for RefreshControl
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                    }}
                >
                    {this._renderScrollViewContent()}
                </Animated.ScrollView>
                <Animated.View

                    style={[
                        styles.header,
                        { transform: [
                            { translateY: headerTranslate }
                            ]
                        },
                    ]}
                >
                    <View
                        style={styles.bar_content}
                    >
                        <Text>평점</Text>
                        <Text>교수명</Text>
                        <Text>교재</Text>
                    </View>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.title}>선택한 강의명</Text>
                </Animated.View>
            </View>
        )
    }
}