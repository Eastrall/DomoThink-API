using System.Windows;
using System.Windows.Controls;

namespace DeviceSimulator.Controls
{
    public partial class StateIndicator : UserControl
    {
        public static readonly DependencyProperty StateProperty = DependencyProperty.Register(nameof(State), typeof(bool), typeof(StateIndicator), new PropertyMetadata(false));

        public bool State
        {
            get { return (bool)this.GetValue(StateProperty); }
            set { this.SetValue(StateProperty, value); }
        }

        public StateIndicator()
        {
            this.InitializeComponent();
        }
    }
}
