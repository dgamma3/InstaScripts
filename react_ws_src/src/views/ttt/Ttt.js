import React, { Component} from 'react'
import { Link } from 'react-router'

import SetName from './SetName'
import SetGameType from './SetGameType'

import GameMain from './GameMain'
import TicTacToeBoard from './TicTacToeBoardHistory';

export default class Ttt extends Component {

	constructor (props) {
		super(props)

		this.state = {
			game_step: this.set_game_step(),
			history: [],
		}
	}

//	------------------------	------------------------	------------------------

	render () {

		const {game_step} = this.state

		return (
			<section id='TTT_game'>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					{/* Main Content */}
					<div id='page-container' style={{ flex: 1 }}>
						{game_step === 'set_name' && (
							<SetName onSetName={this.saveUserName.bind(this)} />
						)}

						{game_step !== 'set_name' && (
							<div>
								<h2>Welcome asdasd, {app.settings.curr_user.name}</h2>
							</div>
						)}

						{game_step === 'set_game_type' && (
							<SetGameType onSetType={this.saveGameType.bind(this)} />
						)}

						{game_step === 'start_game' && (
							<GameMain
								game_type={this.state.game_type}
								onEndGame={this.gameEnd.bind(this)}
								onRecordHistory={this.recordHistory.bind(this)}
							/>
						)}
					</div>

					{/* History Container */}
					<div
						id='history-container'
						style={{
							flex: '0 0 auto',
							marginLeft: '20px',
							padding: '10px',
							borderLeft: this.state.history.length > 0 && '1px solid #ccc'
						}}
					>
						{this.state.history.map(function(board, index) {
							console.log("board", board);
							return <TicTacToeBoard key={index} moves={board} />;
						})}
					</div>
				</div>
			</section>
		)
	}

//	------------------------	------------------------	------------------------

	saveUserName (n) {
		app.settings.curr_user = {}
		app.settings.curr_user.name = n

		this.upd_game_step()
	}

//	------------------------	------------------------	------------------------

	saveGameType (t) {
		this.state.game_type = t

		this.upd_game_step()
	}

//	------------------------	------------------------	------------------------

	gameEnd (reason) {
		this.state.game_type = null

		this.upd_game_step()
	}


	recordHistory(gameBoards) {
		this.setState(function(prevState) {
			// Create a new copy of gameBoards to avoid future mutations affecting history
			var newGameBoards = Object.assign({}, gameBoards);
			return {
				history: prevState.history.concat(newGameBoards)
			};
		});
	}

//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	upd_game_step () {

		this.setState({
			game_step: this.set_game_step()
		})
	}

//	------------------------	------------------------	------------------------

	set_game_step () {

		if (!app.settings.curr_user || !app.settings.curr_user.name)
			return 'set_name'
		else if (!this.state.game_type)
			return 'set_game_type'
		else
			return 'start_game'
	}

}

//	------------------------	------------------------	------------------------

Ttt.propTypes = {
	params: React.PropTypes.any
}

Ttt.contextTypes = {
	router: React.PropTypes.object.isRequired
}