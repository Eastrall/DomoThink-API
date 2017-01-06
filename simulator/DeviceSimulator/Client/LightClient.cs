using Ether.Network;
using Ether.Network.Packets;
using System.Diagnostics;
using System.Threading;
using System.Collections.Generic;
using System.Text;
using DeviceSimulator.IO;
using System;

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
            var header = Encoding.UTF8.GetString(packet.Buffer);
            var p = Encoding.UTF8.GetString(this.FromHex(header));

            switch (header)
            {
                default:
                    Debug.WriteLine("Unknow packet header: {0}", header);
                    break;
            }

            base.HandleMessage(packet);
        }

        public byte[] FromHex(string hex)
        {
            hex = hex.Replace("-", "");
            byte[] raw = new byte[hex.Length / 2];
            for (int i = 0; i < raw.Length; i++)
            {
                raw[i] = Convert.ToByte(hex.Substring(i * 2, 2), 16);
            }
            return raw;
        }

        protected override IReadOnlyCollection<NetPacketBase> SplitPackets(byte[] buffer)
        {
            var list = new List<NetPacketBase>();

            list.Add(new SPacket(buffer));

            return list;
        }
    }
}
