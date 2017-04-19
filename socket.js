let users = {
	user1: {
		time: 305
	},
	user2: {
		time: 205
	},
	user3: {
		time: 15
	},
	user4: {
		time: 25,
	},
	user5: {
		time: 35
	},
	user6: {
		time: 45
	},
	user7: {
		time: 55
	},
	user8: {
		time: 65
	},
	user9: {
		time: 75
	},
	user10: {
		time: 85,
	},
	user11: {
		time: 95
	},
	user12: {
		time: 105
	},
	htlyu: {
		time: 130
	},
	ddymt: {
		time: 122
	},
	ipxau: {
		time: 148
	},
	pjlhk: {
		time: 146
	},
	vanen: {
		time: 152
	},
	nbmxe: {
		time: 174
	},
	jiehp: {
		time: 18
	},
	pvqob: {
		time: 90
	},
	ejluo: {
		time: 50
	},
	bywvt: {
		time: 70
	},
	ektwj: {
		time: 128
	},
	ipqga: {
		time: 128
	},
	rkxgf: {
		time: 186
	},
	qppiw: {
		time: 110
	},
	qtmyk: {
		time: 116
	},
	exeoh: {
		time: 162
	},
	ylucb: {
		time: 80
	},
	dsgzq: {
		time: 118
	},
	vfcln: {
		time: 84
	},
	erepb: {
		time: 72
	},
	dadkk: {
		time: 106
	},
	jmkwt: {
		time: 46
	},
	wwkpl: {
		time: 105
	},
	wqblm: {
		time: 105
	},
	ucnec: {
		time: 105
	},
	dxodb: {
		time: 105
	},
	tgqch: {
		time: 105
	},
	wwqoo: {
		time: 105
	}
};

module.exports = function(io) {
	io.on('connection', function(socket) {
		console.log('A client connected');
		socket.emit('connected');

		socket.on('hello', function(msg) {
			let name = msg.name;
			console.log(name);
			if (!users[name]) socket.emit('reject');
			else {
				socket.emit('time', { seconds: users[name].time - 10 });
				let timer = setInterval(function () {
					if (users[name].time) {
						users[name].time -= 1;
					}
					if (users[name].time === 10) socket.emit('get data');
					if (users[name].time <= 0) clearInterval(timer);
				}, 1000);
			}
		});

		socket.on('data', function(msg) {
			let name = msg.name;
			if (!users[name]) socket.emit('reject');
			else {
				if (users[name].time <= 0) socket.emit('reject');
				else {
					users[name].data = msg.data;
					users[name].score = msg.score;
					users[name].right = msg.right;
					users[name].wrong = msg.wrong;
				}
				console.log(users[name].data);
				socket.emit('done');
			}
		});

		socket.on('admin', function() {
			socket.emit('admin', users);
		});
	});
};
