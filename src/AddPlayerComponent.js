import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AddPlayerComponent extends React.Component {

	constructor() {
    	super();
    	this.state = {
			players: {
				goalkeeper: [],
				defender: [],
				sideway: [],
				midfield: [],
				striker: []
			},
			teams: {
				team1: [],
				team2: []
			}
		}
	}

	addPlayer() {
		const name = document.getElementById('txtName').value;
		const position = parseInt(document.getElementById('slPosition').value);
		const importance = parseInt(document.getElementById('slImportance').value);
		const newPlayer = {
			name: name,
			position: position,
			importance: importance,
		}
		if (this.playerValidate(newPlayer)) {
			if (position === 0) {
				this.setState({ 
					players: { 
						goalkeeper: [...this.state.players.goalkeeper, newPlayer], 
						defender: [...this.state.players.defender], 
						sideway: [...this.state.players.sideway],
						midfield: [...this.state.players.midfield], 
						striker: [...this.state.players.striker],
					},
					teams: { 
						team1: [...this.state.teams.team1],
						team2: [...this.state.teams.team2],
					}
				});
			} else if (position === 1) {
				this.setState({ 
					players: { 
							goalkeeper: [...this.state.players.goalkeeper], 
							defender: [...this.state.players.defender, newPlayer], 
							sideway: [...this.state.players.sideway],
							midfield: [...this.state.players.midfield], 
							striker: [...this.state.players.striker],
						},
						teams: { 
							team1: [...this.state.teams.team1],
							team2: [...this.state.teams.team2],
						}
				});
			} else if (position === 2) {
				this.setState({ 
					players: { 
						goalkeeper: [...this.state.players.goalkeeper], 
						defender: [...this.state.players.defender], 
						sideway: [...this.state.players.sideway, newPlayer],
						midfield: [...this.state.players.midfield], 
						striker: [...this.state.players.striker],
					},
					teams: { 
						team1: [...this.state.teams.team1],
						team2: [...this.state.teams.team2],
					}
				});
			} else if (position === 3) {
				this.setState({ 
					players: { 
						goalkeeper: [...this.state.players.goalkeeper], 
						defender: [...this.state.players.defender], 
						sideway: [...this.state.players.sideway],
						midfield: [...this.state.players.midfield, newPlayer], 
						striker: [...this.state.players.striker],
					},
						teams: { 
							team1: [...this.state.teams.team1],
							team2: [...this.state.teams.team2],
						}
					});
			} else {
				this.setState({ 
					players: { 
						goalkeeper: [...this.state.players.goalkeeper], 
						defender: [...this.state.players.defender], 
						sideway: [...this.state.players.sideway],
						midfield: [...this.state.players.midfield], 
						striker: [...this.state.players.striker, newPlayer],
					},
					teams: { 
						team1: [...this.state.teams.team1],
						team2: [...this.state.teams.team2],
					}
				});
			}
			this.clearPlayer();
		}
	}

	playerValidate(newPlayer) {
		if (newPlayer.position === "") {
			alert("Selecione a posição do jogador.");
			return false;
		}
		if (newPlayer.name === "") {
			alert("Preencha o nome do jogador.");
			return false;
		}
		if (newPlayer.importance === "") {
			alert("Preencha a nota do jogador.");
			return false;
		}
		if (newPlayer.importance < 1 || newPlayer.importance > 5) {
			alert("A nota do jogador deve estar entre 1 e 5.");
			return false;
		}
		let checkExist = false;
		if (this.state.players.goalkeeper.find(p => p.name === newPlayer.name) !== undefined) {
			checkExist = true;
		}
		if (this.state.players.defender.find(p => p.name === newPlayer.name) !== undefined) {
			checkExist = true;
		}
		if (this.state.players.sideway.find(p => p.name === newPlayer.name) !== undefined) {
			checkExist = true;
		}
		if (this.state.players.midfield.find(p => p.name === newPlayer.name) !== undefined) {
			checkExist = true;
		}
		if (this.state.players.striker.find(p => p.name === newPlayer.name) !== undefined) {
			checkExist = true;
		}
		if (checkExist) {
			alert("Já existe um jogador cadastrado com esse nome.");
			return false;
		}
		return true;
	}

	clearPlayer() {
		document.getElementById('txtName').value = '';
		document.getElementById('slImportance').value = 3;
		document.getElementById('slPosition').focus();
	}

	sortMyTeam() {
		const data = this.state.players;
		const headers = {
			headers: {
					'Content-Type': 'application/json'
			}
		}
		axios.post('http://127.0.0.1:5000/', data, { headers : headers}).then((response) => {
				this.clearTeams();
				let team1 = [];
				let team2 = [];
				response.data.team1.forEach((item) => {
						team1.push(item);
				});
				response.data.team2.forEach((item) => {
						team2.push(item);
				});
				team1.forEach((item) => this.addPlayerTeam1(item));
				team2.forEach((item) => this.addPlayerTeam2(item));
				// this.sortTeamsByPosition();
		}).catch(error => {
			console.log(error.message);
		});
	}

	clearTeams() {
		this.setState({ 
			players: { 
				goalkeeper: [...this.state.players.goalkeeper], 
				defender: [...this.state.players.defender], 
				sideway: [...this.state.players.sideway],
				midfield: [...this.state.players.midfield], 
				striker: [...this.state.players.striker],
			},
			teams: {
				team1: [],
				team2: [],
			}
		});
	}

	addPlayerTeam1(player) {
		this.setState({ 
			players: { 
				goalkeeper: [...this.state.players.goalkeeper], 
				defender: [...this.state.players.defender], 
				sideway: [...this.state.players.sideway],
				midfield: [...this.state.players.midfield], 
				striker: [...this.state.players.striker],
			},
			teams: {
				team1: [...this.state.teams.team1, player],
				team2: [...this.state.teams.team2],
			}
		});
	}

	addPlayerTeam2(player) {
		this.setState({ 
			players: { 
				goalkeeper: [...this.state.players.goalkeeper], 
				defender: [...this.state.players.defender], 
				sideway: [...this.state.players.sideway],
				midfield: [...this.state.players.midfield], 
				striker: [...this.state.players.striker],
			},
			teams: {
				team1: [...this.state.teams.team1],
				team2: [...this.state.teams.team2, player],
			}
		});
	}

	sortTeamsByPosition() {
		let team1 = this.state.teams.team1.sort((a, b) => a.position < b.position ? -1 : a.position > b.position ? 1 : 0);
		let team2 = this.state.teams.team2.sort((a, b) => a.position < b.position ? -1 : a.position > b.position ? 1 : 0);
		this.setState({ 
			players: { 
				goalkeeper: [...this.state.players.goalkeeper], 
				defender: [...this.state.players.defender], 
				sideway: [...this.state.players.sideway],
				midfield: [...this.state.players.midfield], 
				striker: [...this.state.players.striker],
			},
			teams: {
				team1: [team1],
				team2: [team2],
			}
		});
	}
  
	render() {
		return (
			<div className='container-fluid mt-3'>
				<div className="card">
  					<div className="card-body">
						<div className='col-12 float-left'>
							<h3 className='text-primary text-center'>Incluir jogador</h3>
						</div>
						<div className='col-12 float-left p-0'>
							<div className='col-3 float-left'>
								<div className='form-group'>
									<label>Posição</label>
									<select id="slPosition" className='form-control'>
										<option value="0">Goleiro</option>
										<option value="1">Zagueiro</option>
										<option value="2">Lateral</option>
										<option value="3">Meio Campo</option>
										<option value="4">Atacante</option>
									</select>
								</div>
							</div>
							<div className='col-6 float-left'>
								<div className='form-group'>
									<label>Nome</label>
									<input id="txtName" type='text' className='form-control' />
								</div>
							</div>
							<div className='col-3 float-left'>
								<div className='form-group'>
									<label>Nota</label>
									<select id="slImportance" className='form-control'>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</div>
							</div>
							<div className='col-12 float-left'>
								<button className='btn btn-primary btn-sm float-right' onClick={this.addPlayer.bind(this)}>Adicionar Jogador</button>
							</div>
						</div>
					</div>
				</div>

				<div className="card mt-3">
  					<div className="card-body">
					  	<div className='col-12 float-left'>
							<h3 className='text-primary text-center'>Jogadores</h3>
						</div>
						<div className='col-12 float-left mt-3'>
							<table className='table'>
								<thead>
									<tr>
										<th>Posição</th>
										<th>Nome</th>
										<th>Nota</th>
									</tr>
								</thead>
								<tbody>
									{this.state.players.goalkeeper.map(player => (
										<tr key={player.name}>
											<td>Goleiro</td>
											<td>{player.name}</td>
											<td>{player.importance}</td>
										</tr>
									))}
									{this.state.players.defender.map(player => (
										<tr key={player.name}>
											<td>Zagueiro</td>
											<td>{player.name}</td>
											<td>{player.importance}</td>
										</tr>
									))}
									{this.state.players.sideway.map(player => (
										<tr key={player.name}>
											<td>Lateral</td>
											<td>{player.name}</td>
											<td>{player.importance}</td>
										</tr>
									))}
									{this.state.players.midfield.map(player => (
										<tr key={player.name}>
											<td>Meio Campo</td>
											<td>{player.name}</td>
											<td>{player.importance}</td>
										</tr>
									))}
									{this.state.players.striker.map(player => (
										<tr key={player.name}>
											<td>Atacante</td>
											<td>{player.name}</td>
											<td>{player.importance}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className='col-12 float-left'>
							<button className='btn btn-primary btn-sm float-right' onClick={this.sortMyTeam.bind(this)}>Sortear Times</button>
						</div>
					</div>
				</div>

				<div className="card mt-3">
  					<div className="card-body">
							<div className='col-6 float-left mt-3'>
								<h3 className='text-primary text-center'>Time 1</h3>
								<table className='table'>
									<thead>
										<tr>
											<th>Posição</th>
											<th>Nome</th>
											<th>Nota</th>
										</tr>
									</thead>
									<tbody>
										{this.state.teams.team1.map(player => (
											<tr key={player.name}>
												<td>{player.position}</td>
												<td>{player.name}</td>
												<td>{player.importance}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<div className='col-6 float-left mt-3'>
								<h3 className='text-primary text-center'>Time 2</h3>
								<table className='table'>
									<thead>
										<tr>
											<th>Posição</th>
											<th>Nome</th>
											<th>Nota</th>
										</tr>
									</thead>
									<tbody>
										{this.state.teams.team2.map(player => (
											<tr key={player.name}>
												<td>{player.position}</td>
												<td>{player.name}</td>
												<td>{player.importance}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
    	);
  	}
  
}

export default AddPlayerComponent;