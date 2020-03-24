import React from 'react'
import { Text, StyleSheet, View, Image, Dimensions, BackHandler, ToastAndroid } from 'react-native'
import PTRView from 'react-native-pull-to-refresh/index';
import Loading from 'react-native-whc-loading'
import axios from 'axios';

//import tema
import * as theme from '../Theme';
import { getValue } from '../utils/apiHelper';
import { dateFormat } from '../utils/dateTimeHelper';

class Detail extends React.Component {

    static navigationOptions = ({ route }) => ({
        title: `${route.selected}`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            detail_negara: {},
            isError: false,
            negaranya: "",
            isLoading: true,
        };

    }

    _refresh = () => {
        return new Promise((resolve) => {
            this.componentDidMount();
            setTimeout(() => { resolve() }, 1000)
        });
    }


    handleBackButton() {
        ToastAndroid.show('Always Wash Your Hands', ToastAndroid.SHORT);

        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        const { params } = this.props.route;
        const selected = params ? params.selected : null;
        var url = "https://covid19.mathdro.id/api/countries/" + selected;

        //tampilkan loading
        this.refs.loading.show(this.state.isLoading);

        axios.get(url)
            .then(res => {
                const datana = res.data;

                this.setState({
                    detail_negara: datana,
                    isLoading: false
                });

                //update state loading
                this.refs.loading.show(this.state.isLoading);
            })
            .catch(err => {

                this.setState({
                    isError: true,
                    negaranya: negara,
                    isLoading: false,
                });

                //update state loading
                this.refs.loading.show(this.state.isLoading);
            })
    }

    render() {
        const data = this.state.detail_negara;
        if (this.state.isError == false) {
            return (
                <PTRView onRefresh={this._refresh} style={styles.container}>
                    <Loading ref="loading" />
                    <View>
                        <Text style={styles.title}>Last Update</Text>
                        <Text style={styles.subtitle}>{dateFormat({ date: this.state.detail_negara.lastUpdate, format: "DD-MMMM-YYYY HH:mm:ss" })}</Text>

                        <View style={styles.rapih}>
                            <View style={styles.kartuKuning} >
                                <View>
                                    <Text style={styles.labelDesc}>Confirmed</Text>
                                    <Text style={styles.labelCount}>{getValue({ data, type: "confirmed" })}</Text>
                                </View>
                                <Image source={require('../assets/images/masker.png')} style={styles.icn} />
                            </View>

                            <View style={styles.recoveredCard} >
                                <View>
                                    <Text style={styles.labelDesc}>Recovered</Text>
                                    <Text style={styles.labelCount}>{getValue({ data, type: "recovered" })}</Text>
                                </View>
                                <Image source={require('../assets/images/recovered.png')} style={styles.icn} />
                            </View>

                            <View style={styles.kartuMerah} >
                                <View>
                                    <Text style={styles.labelDesc}>Death</Text>
                                    <Text style={styles.labelCount}>{getValue({ data, type: "deaths" })}</Text>
                                </View>
                                <Image source={require('../assets/images/death.png')} style={styles.icn} />
                            </View>
                        </View>
                    </View>
                </PTRView>
            )
        } else {
            return (
                <View style={styles.containerErr}>
                    <Loading ref="loading" />
                    <Image source={require('../assets/images/bacteria.png')} style={styles.icnErr} />
                    <Text style={styles.errorTitle}>{this.state.negaranya}</Text>
                    <Text style={styles.errorSubTitle}>Not Registered in JHU Database</Text>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    title: {
        fontSize: theme.ukuran.besar,
        color: theme.colors.putih,
        fontFamily: 'poppins-bold',
        opacity: 0.87,
        paddingLeft: theme.padding.kiri,
        paddingRight: theme.padding.kanan,
        marginTop: 25,
    },
    containerErr: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -100
    },
    errorTitle: {
        fontSize: theme.ukuran.besar,
        color: theme.colors.putih,
        fontFamily: 'poppins-bold',
        opacity: 0.87,
        paddingLeft: theme.padding.kiri,
        paddingRight: theme.padding.kanan,
        marginTop: 30,
        textAlign: 'center'
    },
    errorSubTitle: {
        fontSize: theme.ukuran.kecil,
        color: theme.colors.putih,
        fontFamily: 'poppins',
        opacity: 0.87,
        paddingLeft: theme.padding.kiri,
        paddingRight: theme.padding.kanan,
        textAlign: 'center'
    },
    icnErr: {
        width: 150,
        height: 150,
    },
    subtitle: {
        fontSize: theme.ukuran.kecil,
        color: theme.colors.putih,
        fontFamily: 'poppins',
        opacity: 0.67,
        paddingLeft: theme.padding.kiri,
        paddingRight: theme.padding.kanan,
    },
    rapih: {
        marginTop: 20,
        marginLeft: theme.padding.kiri,
        marginRight: theme.padding.kanan
    },
    kartuKuning: {
        flex: 1,
        backgroundColor: theme.colors.kuning,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: theme.padding.kanan,
        paddingLeft: theme.padding.kiri,
        borderRadius: theme.sizes.radius,
        alignItems: 'center'
    },
    recoveredCard: {
        flex: 1,
        backgroundColor: theme.colors.hijau,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: theme.padding.kanan,
        paddingLeft: theme.padding.kiri,
        borderRadius: theme.sizes.radius,
        alignItems: 'center',
        marginTop: 20
    },
    kartuMerah: {
        flex: 1,
        backgroundColor: theme.colors.merah,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: theme.padding.kanan,
        paddingLeft: theme.padding.kiri,
        borderRadius: theme.sizes.radius,
        alignItems: 'center',
        marginTop: 20
    },
    labelCount: {
        fontFamily: 'poppins-bold',
        color: theme.colors.putih,
        fontSize: 30,
        marginTop: -5
    },
    labelDesc: {
        fontFamily: 'poppins',
        color: theme.colors.putih,
        fontSize: theme.ukuran.medium,
        marginTop: 10
    }
});

export default Detail;