import MidiPlayer from 'react-midi-player';

 const Player = ({ audioData }) => {
  const midiData = atob(audioData);

  return (
      <MidiPlayer data={midiData} width="100%" />
  );
};
export default Player;