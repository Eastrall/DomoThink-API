using Ether.Network;
using Ether.Network.Packets;
using System.Diagnostics;
using System.Threading;
using System.Collections.Generic;
using System.Text;
using DeviceSimulator.IO;
using System;
using Newtonsoft.Json.Linq;
using DeviceSimulator.Packets;
using DeviceSimulator.Models;

namespace DeviceSimulator.Client
{
    public class LightClient : NetClient
    {
        public ConnectedObject Object { get; private set; }

        public LightClient()
        {
            this.Object = new ConnectedObject()
            {
                Name = "LIGHT_XBZF_37",
                Type = 1,
                State = 0,
                Protocole = "SIMULATOR",
                Id = 35432
            };
        }

        protected override void OnClientDisconnected()
        {
        }

        public override void HandleMessage(NetPacketBase packet)
        {
            dynamic packetData = JObject.Parse(Encoding.UTF8.GetString(packet.Buffer));
            int header = packetData.header;

            switch (header)
            {
                case 0x00:
                    ObjectPackets.SendDeviceInformations(this, this.Object);
                    break;

                default:
                    Debug.WriteLine("Unknow packet header: {0}", header);
                    break;
            }

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
