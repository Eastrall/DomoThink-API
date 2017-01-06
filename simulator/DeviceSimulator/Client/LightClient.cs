using Ether.Network;
using Ether.Network.Packets;
using System.Diagnostics;

namespace DeviceSimulator.Client
{
    public class LightClient : NetClient
    {
        public LightClient()
        {
        }

        protected override void OnClientDisconnected()
        {
        }

        public override void HandleMessage(NetPacketBase packet)
        {
            var header = packet.Read<int>();

            switch (header)
            {
                default:
                    Debug.WriteLine("Unknow packet header: {0}", header);
                    break;
            }

            base.HandleMessage(packet);
        }
    }
}
