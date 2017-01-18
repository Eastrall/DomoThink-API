using System.Runtime.Serialization;

namespace DeviceSimulator.Models
{
    [DataContract]
    public class SimulatorPacket
    {
        [DataMember(Name = "header")]
        public int Header { get; set; }

        [DataMember(Name = "data")]
        public object Data { get; set; }

        public SimulatorPacket()
        {
        }
    }
}
