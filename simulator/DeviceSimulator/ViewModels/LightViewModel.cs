using DeviceSimulator.Client;
using DeviceSimulator.ViewModels.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceSimulator.ViewModels
{
    public class LightViewModel : ViewModelBase
    {
        private LightClient client;

        public LightViewModel()
        {
            this.client = new LightClient();
            this.client.Connect("127.0.0.1", 4444);
        }

        ~LightViewModel()
        {
            this.client.Disconnect();
            this.client.Dispose();
        }
    }
}
