function registerPeerConnectionLintners(peerConnection: any) {
    peerConnection.addEventListener('icegatheringstatechange', () => {
        console.log(
            `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
      });
    
      peerConnection.addEventListener('connectionstatechange', () => {
        console.log(`Connection state change: ${peerConnection.connectionState}`);
      });
    
      peerConnection.addEventListener('signalingstatechange', () => {
        console.log(`Signaling state change: ${peerConnection.signalingState}`);
      });
    
      peerConnection.addEventListener('iceconnectionstatechange ', () => {
        console.log(
            `ICE connection state change: ${peerConnection.iceConnectionState}`);
      });
}

export default registerPeerConnectionLintners;
