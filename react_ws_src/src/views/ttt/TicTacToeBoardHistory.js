import React, { Component } from 'react';

class TicTacToeBoard extends Component {
	renderCell(index, value) {
		return (
			<td
				key={index}
				style={{
					border: '1px solid black',
					width: '50px',
					height: '50px',
					textAlign: 'center',
					fontSize: '2em',
					cursor: 'pointer'
				}}
			>
				{value}
			</td>
		);
	}

	renderRow(rowIndex, board) {
		const cells = [];
		for (let col = 0; col < 3; col++) {
			const index = rowIndex * 3 + col;
			cells.push(this.renderCell(index, board[index]));
		}
		return <tr key={rowIndex}>{cells}</tr>;
	}

	render() {

		const moves = Object.entries(this.props.moves || {}).map(function(entry) {
			var key = entry[0],
				player = entry[1];
			var id = parseInt(key.replace('c', ''), 10) - 1;
			return { id: id, player: player.toUpperCase() };
		});


		const board = Array(9).fill('');

		// Apply moves to board
		moves.forEach(({ id, player }) => {
			board[id] = player;
		});

		const rows = [];
		for (let row = 0; row < 3; row++) {
			rows.push(this.renderRow(row, board));
		}

		return (
			<table style={{ borderCollapse: 'collapse', width: '150px', height: '150px' }}>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

export default TicTacToeBoard;
