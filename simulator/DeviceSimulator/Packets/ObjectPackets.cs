using DeviceSimulator.IO;
using DeviceSimulator.Models;
using Ether.Network;
using Ether.Network.Packets;
using Newtonsoft.Json;
using System.Text;

namespace DeviceSimulator.Packets
{
    public static class ObjectPackets
    {
        public static void SendDeviceInformations(NetConnection connection, ConnectedObject obj)
        {
            var simPacket = new SimulatorPacket()
            {
                Header = 0x01,
                Data = obj
            };

            string json = JsonConvert.SerializeObject(simPacket);

            connection.Socket.Send(Encoding.Default.GetBytes(json));
        }
    }
}
