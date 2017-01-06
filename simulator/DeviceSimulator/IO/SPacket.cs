using Ether.Network.Packets;

namespace DeviceSimulator.IO
{
    public class SPacket : NetPacketBase
    {
        public override byte[] Buffer
        {
            get { return this.GetBuffer(); }
        }

        public SPacket()
            : base()
        {
        }

        public SPacket(byte[] buffer)
            : base(buffer)
        {
        }
    }
}
