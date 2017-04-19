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
		time: 105
	},
	ddymt: {
		time: 105
	},
	ipxau: {
		time: 105
	},
	pjlhk: {
		time: 105
	},
	vanen: {
		time: 105
	},
	nbmxe: {
		time: 105
	},
	jiehp: {
		time: 105
	},
	pvqob: {
		time: 105
	},
	ejluo: {
		time: 105
	},
	bywvt: {
		time: 105
	},
	ektwj: {
		time: 105
	},
	ipqga: {
		time: 105
	},
	rkxgf: {
		time: 105
	},
	qppiw: {
		time: 105
	},
	qtmyk: {
		time: 105
	},
	exeoh: {
		time: 105
	},
	ylucb: {
		time: 105
	},
	dsgzq: {
		time: 105
	},
	vfcln: {
		time: 105
	},
	erepb: {
		time: 105
	},
	dadkk: {
		time: 105
	},
	jmkwt: {
		time: 105
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
