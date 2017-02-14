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
                    <img className="sub-menu-img-cover" src={this.props.contest.uisettings.submenu_img}/>
                </div>
            </div>
        )
    }

    renderNoCurrentContest() {
        return(
            <div className="full-width"><p className="full-width text-center">AUCUN CONCOURS EN COURS POUR LE MOMENT</p></div>
        )
    }
    render () {
        return (
            ( this.props.contest.currentContest ) ? this.renderCurrentContest() : this.renderNoCurrentContest()

        )
    }
}
