import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, TouchableHighlight, View } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import PTRView from "react-native-pull-to-refresh";
import { getCountryList, getGlobalData, getLocalData } from "services/apiServices";
import * as theme from "theme";
import { getValue } from "utils/apiHelper";
import { dateFormat } from "utils/dateTimeHelper";
import i18n, { t } from "i18n";
import { Updates } from "expo";
import { supportedLocales } from "i18n/config";
import { styles } from "./home.style";

const { height } = Dimensions.get("screen");

const locales = Object.keys(supportedLocales).map(language => ({ value: language }));

export const Home = ({ defaultCountry, navigation }) => {
  const [globalData, setGlobalData] = useState({});
  const [localData, setLocalData] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [country, setCountry] = useState(defaultCountry);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCountry(defaultCountry);
  }, [defaultCountry]);

  const refresh = () => {
    return new Promise(resolve => {
      getInitialData();
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const getInitialData = () => {
    getGlobalData(res => {
      setGlobalData(res.data);
    });

    getCountryList(res => {
      const countriyData = res.data.countries;
      const newCountries = countriyData.map(item => {
        return { value: item.name };
      });

      setCountries(newCountries);
    });

    getLocalData(country, res => {
      setLocalData(res.data);
    });
  };

  const renderGlobalStatus = () => {
    return (
      <View style={styles.status}>
        <View style={styles.kartuConfirmed}>
          <View style={styles.kartuKet}>
            <Image source={require("assets/images/masker.png")} style={styles.icn} />
            <View>
              <Text style={styles.labelCount}>
                {getValue({ data: globalData, type: "confirmed" })}
              </Text>
              <Text style={styles.labelDesc}>{t("confirmed")}</Text>
            </View>
          </View>
        </View>
        <View style={styles.kartuRecovered}>
          <View style={styles.kartuKet}>
            <Image source={require("assets/images/recovered.png")} style={styles.icn} />
            <View>
              <Text style={styles.labelCount}>
                {getValue({ data: globalData, type: "recovered" })}
              </Text>
              <Text style={styles.labelDesc}>{t("recovered")}</Text>
            </View>
          </View>
        </View>
        <View style={styles.kartuDeath}>
          <View style={styles.kartuKet}>
            <Image source={require("assets/images/death.png")} style={styles.icn} />
            <View>
              <Text style={styles.labelCount}>
                {getValue({ data: globalData, type: "deaths" })}
              </Text>
              <Text style={styles.labelDesc}>{t("death")}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderLocalStatus = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.localTitle}>{`${country} ${t("home:status")}`}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: theme.padding.left,
            marginRight: theme.padding.right,
            marginTop: 20
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.textConfirmedBold}>
              {getValue({ data: localData, type: "confirmed" })}
            </Text>
            <Text style={styles.textConfirmed}>{t("confirmed")}</Text>
          </View>

          <View style={{ width: 2, height: height / 15, backgroundColor: "#FFF", opacity: 0.87 }} />

          <View style={{ alignItems: "center" }}>
            <Text style={styles.textRecoveredBold}>
              {getValue({ data: localData, type: "recovered" })}
            </Text>
            <Text style={styles.textRecovered}>{t("recovered")}</Text>
          </View>

          <View style={{ width: 2, height: height / 15, backgroundColor: "#FFF", opacity: 0.87 }} />

          <View style={{ alignItems: "center" }}>
            <Text style={styles.textDeathBold}>
              {getValue({ data: localData, type: "deaths" })}
            </Text>
            <Text style={styles.textDeath}>{t("death")}</Text>
          </View>
          <View style={{ width: 2, height: height / 15, backgroundColor: "#FFF", opacity: 0.87 }} />

          <View style={{ alignItems: "center" }}>
            <Text style={styles.textUpdatedBold}>
              {dateFormat({
                date: getValue({ data: localData, type: "lastUpdate" }),
                format: "DD-MM HH:mm"
              })}
            </Text>
            <Text style={styles.textUpdated}>{t("updated")}</Text>
          </View>
        </View>
      </View>
    );
  };

  const setLanguage = async language => {
    await i18n.init(language);

    Updates.reloadFromCache();
  };

  const renderLocation = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{t("home:selectCountry")}</Text>
        <View style={styles.rapih}>
          <Dropdown
            value={selectedCountry}
            baseColor={theme.colors.white}
            itemTextStyle={{ color: "#FFF", fontSize: 18, padding: 12, fontFamily: "poppins" }}
            itemColor={theme.colors.black}
            selectedItemColor={theme.colors.black}
            textColor="#FFF"
            fontSize={16}
            data={countries}
            onChangeText={value => setSelectedCountry(value)}
          />
          <TouchableHighlight
            underlayColor="#1F746A"
            style={styles.btnRecovered}
            onPress={() =>
              navigation.navigate("Detail", {
                selected: selectedCountry
              })
            }
          >
            <Text style={styles.btnRecoveredText}>{t("home:check")}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  return (
    <PTRView onRefresh={refresh} style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
          <View style={{ flex: 4 }}>
            <Text style={styles.title}>{t("home:statusGlobal")}</Text>
          </View>
          <View style={{ ...styles.language, flex: 1 }}>
            <Dropdown
              value={i18n.localeName}
              baseColor={theme.colors.white}
              itemTextStyle={{ color: "#FFF", fontSize: 18, padding: 12, fontFamily: "poppins" }}
              itemColor={theme.colors.black}
              selectedItemColor={theme.colors.black}
              textColor="#FFF"
              fontSize={16}
              data={locales}
              onChangeText={value => setLanguage(value)}
            />
          </View>
        </View>
        {renderGlobalStatus()}
        {renderLocalStatus()}
        {renderLocation()}
      </View>
    </PTRView>
  );
};
