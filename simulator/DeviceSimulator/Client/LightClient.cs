using Ether.Network;
using Ether.Network.Packets;
using System.Collections.Generic;
using System.Text;
using DeviceSimulator.IO;
using Newtonsoft.Json.Linq;

namespace DeviceSimulator.Client
{
    public class LightClient : NetClient
    {
        public delegate void IncomingDataHandler(dynamic data);
        public event IncomingDataHandler OnIncomingData;

        public LightClient()
        {
        }

        protected override void OnClientDisconnected()
        {
        }

        public override void HandleMessage(NetPacketBase packet)
        {
            dynamic packetData = JObject.Parse(Encoding.UTF8.GetString(packet.Buffer));

            this.OnIncomingData?.Invoke(packetData);

            base.HandleMessage(packet);
        }

        protected override IReadOnlyCollection<NetPacketBase> SplitPackets(byte[] buffer)
        {
            var list = new List<NetPacketBase>();

            list.Add(new SPacket(buffer));

            return list;
        }
    }
}
