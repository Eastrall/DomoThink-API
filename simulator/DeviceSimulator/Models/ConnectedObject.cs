using System.Runtime.Serialization;

namespace DeviceSimulator.Models
{
    [DataContract]
    public class ConnectedObject
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "protocole")]
        public string Protocole { get; set; }

        [DataMember(Name = "type")]
        public int Type { get; set; }

        [DataMember(Name = "state")]
        public int State { get; set; }

        [DataMember(Name = "isController")]
        public bool IsController { get; set; }

        public ConnectedObject()
        {
        }
    }
}
