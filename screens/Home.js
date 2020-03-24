import React, { Component } from 'react'
import { Text, ToastAndroid, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity, Button, TouchableHighlight } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import PTRView from 'react-native-pull-to-refresh';
import axios from 'axios';
import { BackHandler } from 'react-native';
//import tema
import * as theme from '../Theme';
import { getValue } from '../utils/apiHelper';
import { dateFormat } from '../utils/dateTimeHelper';

const { width, height } = Dimensions.get('screen');



class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data_global: {},
            countries: [],
            selectedCountry: "",
            default: "Azerbaijan",
            stat_az: {}
        };
    }

    _refresh = () => {
        return new Promise((resolve) => {
            this.componentDidMount();
            this.setState({ default: "Azerbaijan" });
            setTimeout(() => { resolve() }, 1000)
        });
    }


    handleBackButton() {
        ToastAndroid.show('apps by @mediusoft \n API by @mathdroid', ToastAndroid.SHORT);
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        //get all countries
        axios.get('https://covid19.mathdro.id/api')
            .then(res => {
                const data = res.data;
                this.setState({ data_global: data });
            })

        axios.get('https://covid19.mathdro.id/api/countries/')
            .then(res => {
                const data_countries = res.data.countries;
                const tempCountry = data_countries.map(item => {
                    return { value: item.name }
                })

                this.setState({ countries: tempCountry });
            })

        axios.get('https://covid19.mathdro.id/api/countries/Azerbaijan')
            .then(res => {
                const data = res.data;
                this.setState({ stat_az: data });
            })

    }

    renderGlobalStatus = () => {
        const data = this.state.data_global;
        return (
            <View style={styles.status}>
                <View style={styles.kartuConfirmed}>
                    <View style={styles.kartuKet}>
                        <Image source={require('../assets/images/masker.png')} style={styles.icn} />
                        <View>
                            <Text style={styles.labelCount}>{getValue({ data, type: "confirmed" })}</Text>
                            <Text style={styles.labelDesc}>Confirmed</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.kartuRecovered}>
                    <View style={styles.kartuKet}>
                        <Image source={require('../assets/images/recovered.png')} style={styles.icn} />
                        <View>
                            <Text style={styles.labelCount}>{getValue({ data, type: "recovered" })}</Text>
                            <Text style={styles.labelDesc}>Recovered</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.kartuDeath}>
                    <View style={styles.kartuKet}>
                        <Image source={require('../assets/images/death.png')} style={styles.icn} />
                        <View>
                            <Text style={styles.labelCount}>{getValue({ data, type: "deaths" })}</Text>
                            <Text style={styles.labelDesc}>Death</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };


    renderLocation = () => {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>Select Country</Text>

                <View style={styles.rapih}>
                    <Dropdown
                        value={this.state.default}
                        baseColor={theme.colors.putih}
                        itemTextStyle={{ color: "#FFF", fontSize: 18, padding: 12, fontFamily: 'poppins' }}
                        itemColor={theme.colors.hitam}
                        selectedItemColor={theme.colors.hitam}
                        textColor="#FFF"
                        label="- select -"
                        fontSize={16}
                        data={this.state.countries}
                        onChangeText={value => this.onChangeHandler(value)}
                    />
                    <TouchableHighlight
                        underlayColor='#1F746A'
                        style={styles.btnRecovered}
                        onPress={() => this.props.navigation.navigate('Detail',
                            { selected: (this.state.selectedCountry == "") ? 'Azerbaijan' : this.state.selectedCountry })}>
                        <Text style={styles.btnRecoveredText}>CHECK</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };

    onChangeHandler = (value) => {
        this.setState({ selectedCountry: value });
    }

    renderAzerbaijan = () => {
        const data = this.state.stat_az;
        console.log("data",data)
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.localTitle}>Azerbaijan Status</Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: theme.padding.kiri, marginRight: theme.padding.kanan, marginTop: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textConfirmedBold}>{getValue({ data, type: "confirmed" })}</Text>
                        <Text style={styles.textConfirmed}>Confirmed</Text>
                    </View>

                    <View style={{ width: 2, height: height / 15, backgroundColor: '#FFF', opacity: 0.87 }}></View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textRecoveredBold}>{getValue({ data, type: "recovered" })}</Text>
                        <Text style={styles.textRecovered}>Recovered</Text>
                    </View>

                    <View style={{ width: 2, height: height / 15, backgroundColor: '#FFF', opacity: 0.87 }}></View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textDeathBold}>{getValue({ data, type: "deaths" })}</Text>
                        <Text style={styles.textDeath}>Death</Text>
                    </View>
                    <View style={{ width: 2, height: height / 15, backgroundColor: '#FFF', opacity: 0.87 }}></View>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textUpdatedBold}>{data && dateFormat({ date: getValue({ data, type: "lastUpdate" }), format: "DD-MM HH:mm" })}</Text>
                        <Text style={styles.textUpdated}>Updated</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {

        return (
            <PTRView onRefresh={this._refresh} style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Status Global</Text>
                    {this.renderGlobalStatus()}
                    {this.renderAzerbaijan()}
                    {this.renderLocation()}
                </View>
            </PTRView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        flexDirection: 'column'
    },
    rapih: {
        height: height / 3.7,
        marginLeft: theme.padding.kiri,
        marginRight: theme.padding.kanan,
        fontFamily: 'poppins',
        fontSize: 18,
        backgroundColor: theme.colors.background_secondary
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
    localTitle: {
        fontSize: theme.ukuran.besar,
        color: theme.colors.putih,
        fontFamily: 'poppins-bold',
        opacity: 0.87,
        paddingLeft: theme.padding.kiri,
        paddingRight: theme.padding.kanan,
        marginTop: 30,
    },
    status: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: theme.padding.kiri,
        paddingRight: theme.padding.kanan,
        marginTop: 20
    },
    kartuConfirmed: {
        flex: 1,
        padding: 2,
        height: height / 4.5,
        backgroundColor: theme.colors.kuning,
        marginRight: 7,
        borderRadius: theme.sizes.radius
    },
    kartuRecovered: {
        flex: 1,
        padding: 2,
        height: height / 4.5,
        backgroundColor: theme.colors.hijau,
        marginRight: 7,
        borderRadius: theme.sizes.radius
    },
    kartuDeath: {
        flex: 1,
        padding: 2,
        height: height / 4.5,
        backgroundColor: theme.colors.merah,
        marginRight: 7,
        borderRadius: theme.sizes.radius
    },
    kartuKet: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    labelCount: {
        color: theme.colors.putih,
        fontSize: theme.ukuran.sedang,
        textAlign: 'center',
        fontFamily: 'poppins-bold',
        marginTop: 10
    },
    labelDesc: {
        color: theme.colors.putih,
        fontSize: theme.ukuran.kecil,
        textAlign: 'center',
        fontFamily: 'poppins',
        marginTop: -5
    },
    icn: {
        width: 40,
        height: 40,
        marginTop: 10
    },
    btnRecovered: {
        backgroundColor: theme.colors.hijau,
        marginTop: 20,
        padding: 8,
        borderRadius: theme.sizes.radius
    },
    btnRecoveredText: {
        color: theme.colors.putih,
        fontSize: theme.ukuran.sedang,
        textAlign: 'center',
        fontFamily: 'poppins-bold'
    },
    card: {
        flex: 1,
        backgroundColor: theme.colors.background_secondary,
        marginTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    textConfirmedBold: {
        color: theme.colors.kuning,
        fontSize: 16,
        fontFamily: "poppins-bold"
    },
    textConfirmed: {
        color: theme.colors.kuning,
        fontSize: 12,
        fontFamily: "poppins",
        marginTop: -5
    },
    textRecoveredBold: {
        color: theme.colors.hijau,
        fontSize: 16,
        fontFamily: "poppins-bold"
    },
    textRecovered: {
        color: theme.colors.hijau,
        fontSize: 12,
        fontFamily: "poppins",
        marginTop: -5
    },
    textBiruBold: {
        color: theme.colors.biru,
        fontSize: 16,
        fontFamily: "poppins-bold"
    },
    textBiru: {
        color: theme.colors.biru,
        fontSize: 12,
        fontFamily: "poppins",
        marginTop: -5
    },
    textDeathBold: {
        color: theme.colors.merah,
        fontSize: 16,
        fontFamily: "poppins-bold"
    },
    textDeath: {
        color: theme.colors.merah,
        fontSize: 12,
        fontFamily: "poppins",
        marginTop: -5
    },
    textUpdatedBold: {
        color: theme.colors.putih,
        marginBottom: 3,
        fontSize: 14,
        fontFamily: "poppins-bold"
    },
    textUpdated: {
        color: theme.colors.putih,
        fontSize: 12,
        fontFamily: "poppins",
        marginTop: -5
    },


})

export default Home;