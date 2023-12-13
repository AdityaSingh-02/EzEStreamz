class PeerService {
	peer: RTCPeerConnection;
	constructor() {
		if (!this.peer) {
			this.peer = new RTCPeerConnection({
				iceServers: [
					{
						urls: [
							'stun:stun.l.google.com:19302',
							'stun:global.stun.twilio.com:3478',
							'stun:stun.l.google.com:19302',
							'stun:stun1.l.google.com:19302',
							'stun:stun2.l.google.com:19302',
						],
					},
				],
			});
		}
	}

	async getOffer() {
		if (this.peer) {
			const offer = await this.peer.createOffer();
			await this.peer.setLocalDescription(new RTCSessionDescription(offer));
			return offer;
		}
	}

	async getAnswer(offer: any) {
		if (this.peer) {
			await this.peer.setRemoteDescription(offer);
			const ans = await this.peer.createAnswer();
			await this.peer.setLocalDescription(new RTCSessionDescription(ans));
			return ans;
		}
	}

	async setLocalDescription(ans: any) {
		if (this.peer) {
			await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
		}
	}
}

export default new PeerService();
