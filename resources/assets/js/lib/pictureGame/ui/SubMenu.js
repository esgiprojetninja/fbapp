import React, {PropTypes as T} from "react";
import AutoComplete from 'material-ui/AutoComplete';
import Search from 'material-ui/svg-icons/action/search'

const colors = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Black',
    'White',
];

const fruit = [
    'Apple', 'Apricot', 'Avocado',
    'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
    'Boysenberry', 'Blood Orange',
    'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
    'Coconut', 'Cranberry', 'Clementine',
    'Damson', 'Date', 'Dragonfruit', 'Durian',
    'Elderberry',
    'Feijoa', 'Fig',
    'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
    'Honeydew', 'Huckleberry',
    'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
    'Kiwi fruit', 'Kumquat',
    'Lemon', 'Lime', 'Loquat', 'Lychee',
    'Nectarine',
    'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
    'Olive', 'Orange',
    'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
    'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
    'Quince',
    'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
    'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
    'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
    'Ugli fruit',
    'Watermelon',
];

export default class SubMenu extends React.PureComponent {
    renderCurrentContest() {
        return (
            <div className="sub-menu container vertical-align">
                <div className="left-div col-md-8">
                    <h1 className="col-md-6 col-xs-12 col-sm-12 text-center">{this.props.contest.currentContest.title}</h1>
                    <span className="col-md-6 col-xs-12 col-sm-12 text-center">{this.props.contest.currentContest.description}</span>
                    <div className="relative">
                        <Search className="sub-menu-search"/>
                        <AutoComplete
                        floatingLabelText="Rechercher une photo, un photographe"
                        fullWidth={true}
                        className="sub-menu-autocomplete"
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={colors}
                        />
                    </div>
                </div>

                <div className="col-md-2 hidden-xs hidden-sm">
                    <img className="sub-menu-img-cover" src="subMenuLogo.png"/>
                </div>
            </div>
        )
    }

    renderNoCurrentContest() {
        return(
            <div>AUCUN CONCOURS EN COURS POUR LE MOMENT</div>
        )
    }
    render () {

        return (
            ( this.props.contest.currentContest !== undefined ) ? this.renderCurrentContest() : this.renderNoCurrentContest()
            
        )
    }
}
