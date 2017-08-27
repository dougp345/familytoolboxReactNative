const React = require('react-native')
const {StyleSheet} = React
const constants = {
  grayBorder: '#585858',
  blackBackground: 'black',
  headerBackground: '#1C1C1C',
  textColor: 'white',
  tabiconsize: 25,
  tabiconselectedcolor: 'blue',
  tabiconnotselectedcolor: '#A4A4A4',
  sectionselectedcolor: 'blue',
  sectionunselectedcolor: '#545461',
  sectionselectedtextcolor: 'white',
  sectionunselectedtextcolor: '#757588',
  untoggleditemcolor: "white",
  toggleditemcolor: "#757588"
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: constants.blackBackground,
    flex: 1
  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: constants.blackBackground,
    borderBottomColor: constants.grayBorder,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  liText: {
    color: 'white',
    fontSize: 16,
  },
  liHeader: {
    height: 35,
    backgroundColor: constants.headerBackground,
    justifyContent: 'center'
  },
  liHeaderText: {
    paddingLeft: 16,
    color: 'white'
  },
  tabrow: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: constants.headerBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabitem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionrow: {
    flexDirection: 'row',
    height: 35,
    backgroundColor: constants.blackBackground,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

module.exports = styles
module.exports.constants = constants;
