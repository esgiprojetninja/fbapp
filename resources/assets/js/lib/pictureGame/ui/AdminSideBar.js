import React, {PropTypes as T} from "react";

export default class AdminSideBar extends React.PureComponent {
    constructor(){
        super();
    }

    render () {
        return (
            <div>
                <div>

                </div>

                <div>
                    <ul>
                        <li>
                            <a>Concours</a>
                        </li>
                        <li>
                            <a>Styles</a>
                        </li>
                        <li>
                            <a>Se déconnecter</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
