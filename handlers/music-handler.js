import music from '2pg-music';
const { MusicClient } = music;

export class MusicHandler {
  constructor() {
    this.client = new MusicClient();
    this.client.on('trackStart',
      ({ textChannel }, track) => textChannel?.send(
        `**${track.title}** started.\n` +
        `Requested by ${track.requestor}.`
      ));
  }

  getPlayer(guildId, msg) {
    return this.client.get(guildId)
      ?? this.client.create(guildId, {
        guildId,
        textChannel: msg.channel,
        voiceChannel: msg.member.voice.channel
      });
  }
}
