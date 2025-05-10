
import React, { useState } from 'react';
import { AppSidebar } from '../components/app-sidebar';
import { SearchBar } from '../components/search-bar';
import { StatCard } from '../components/stat-card';
import { DataTable } from '../components/ui/data-table';
import { DataChart } from '../components/data-chart';
import { Pagination } from '../components/pagination';
import { 
  Download, 
  Edit, 
  MonitorDown, 
  Router, 
  Smartphone, 
  ChevronDown, 
  MoreHorizontal,
  BarChart2,
  Laptop,
  Calendar
} from 'lucide-react';

// Datos de ejemplo para los equipos
const equiposData = [
  { 
    id: 1, 
    hostname: '01SISPE01', 
    ip: '192.168.110.20', 
    sede: 'Paquetería Express', 
    area: 'Tecnología', 
    responsable: 'Stiven Castillo',
    mac: '5A:BF:8E:C8:D7:8D',
    procesador: 'Intel® Core™ i3-12100',
    memoriaRam: '8GB',
    discoDuro: '256GB',
    tipoDisco: 'SSD',
    activo: '5763',
    marca: 'HP',
    referencia: 'ASUS Vivobook 15 IX1607I',
    serial: 'PC-4X93-8Z70QL',
    tipoEquipo: 'Laptop',
    monitor: true
  },
  { 
    id: 2, 
    hostname: '01SISPE02', 
    ip: '192.168.110.239', 
    sede: 'Paquetería Express', 
    area: 'Tecnología', 
    responsable: 'Sebastian Tobar',
    mac: '5A:BF:8E:C8:D7:8E',
    procesador: 'Intel® Core™ i5-11400',
    memoriaRam: '16GB',
    discoDuro: '512GB',
    tipoDisco: 'SSD',
    activo: '5764',
    marca: 'Dell',
    referencia: 'Inspiron 5510',
    serial: 'PC-4X93-8Z70QM',
    tipoEquipo: 'Laptop',
    monitor: false
  },
  { 
    id: 3, 
    hostname: '01SISPT01', 
    ip: '192.168.110.20', 
    sede: 'Paquetería Express', 
    area: 'Tecnología', 
    responsable: 'Stiven Castillo',
    mac: '5A:BF:8E:C8:D7:8F',
    procesador: 'Intel® Core™ i7-12700',
    memoriaRam: '32GB',
    discoDuro: '1TB',
    tipoDisco: 'SSD',
    activo: '5765',
    marca: 'Lenovo',
    referencia: 'ThinkPad T14s',
    serial: 'PC-4X93-8Z70QN',
    tipoEquipo: 'Laptop',
    monitor: true
  },
  { 
    id: 4, 
    hostname: '01SISPE01', 
    ip: '192.168.110.20', 
    sede: 'Paquetería Express', 
    area: 'Tecnología', 
    responsable: 'Stiven Castillo',
    mac: '5A:BF:8E:C8:D7:90',
    procesador: 'Intel® Core™ i5-12500',
    memoriaRam: '16GB',
    discoDuro: '512GB',
    tipoDisco: 'SSD',
    activo: '5766',
    marca: 'HP',
    referencia: 'EliteBook 840 G8',
    serial: 'PC-4X93-8Z70QO',
    tipoEquipo: 'Laptop',
    monitor: false
  },
  { 
    id: 5, 
    hostname: '01SISPE01', 
    ip: '192.168.110.20', 
    sede: 'Paquetería Express', 
    area: 'Tecnología', 
    responsable: 'Stiven Castillo',
    mac: '5A:BF:8E:C8:D7:91',
    procesador: 'Intel® Core™ i3-10100',
    memoriaRam: '8GB',
    discoDuro: '256GB',
    tipoDisco: 'HDD',
    activo: '5767',
    marca: 'Dell',
    referencia: 'Optiplex 3080',
    serial: 'PC-4X93-8Z70QP',
    tipoEquipo: 'Desktop',
    monitor: true
  },
  { 
    id: 6, 
    hostname: '01SISPE01', 
    ip: '192.168.110.20', 
    sede: 'Paquetería Express', 
    area: 'Tecnología', 
    responsable: 'Stiven Castillo',
    mac: '5A:BF:8E:C8:D7:92',
    procesador: 'Intel® Core™ i5-11400',
    memoriaRam: '16GB',
    discoDuro: '512GB',
    tipoDisco: 'SSD',
    activo: '5768',
    marca: 'HP',
    referencia: 'ProDesk 600 G6',
    serial: 'PC-4X93-8Z70QQ',
    tipoEquipo: 'Desktop',
    monitor: true
  },
];

// Datos para el gráfico
const chartData = [
  { name: 'Ene', desktop: 40, laptop: 24, servidor: 12 },
  { name: 'Feb', desktop: 42, laptop: 26, servidor: 12 },
  { name: 'Mar', desktop: 45, laptop: 30, servidor: 13 },
  { name: 'Abr', desktop: 50, laptop: 35, servidor: 14 },
  { name: 'May', desktop: 52, laptop: 37, servidor: 15 },
  { name: 'Jun', desktop: 60, laptop: 42, servidor: 19 },
  { name: 'Jul', desktop: 65, laptop: 45, servidor: 20 },
  { name: 'Ago', desktop: 70, laptop: 50, servidor: 22 },
  { name: 'Sep', desktop: 75, laptop: 53, servidor: 24 },
  { name: 'Oct', desktop: 80, laptop: 58, servidor: 25 },
  { name: 'Nov', desktop: 85, laptop: 62, servidor: 28 },
  { name: 'Dic', desktop: 90, laptop: 68, servidor: 30 },
];

const Index = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSede, setSelectedSede] = useState("Todos");
  const [selectedArea, setSelectedArea] = useState("Todos");

  const toggleSelectItem = (item: any) => {
    if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const toggleExpandItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const columns = [
    {
      id: "hostname",
      header: "Hostname",
      cell: (item: any) => <div className="font-medium">{item.hostname}</div>,
      sortable: true,
    },
    {
      id: "ip",
      header: "IP",
      cell: (item: any) => item.ip,
      sortable: true,
    },
    {
      id: "sede",
      header: "Sede",
      cell: (item: any) => item.sede,
      sortable: true,
    },
    {
      id: "area",
      header: "Área",
      cell: (item: any) => item.area,
      sortable: true,
    },
    {
      id: "responsable",
      header: "Responsable",
      cell: (item: any) => item.responsable,
      sortable: true,
    },
    {
      id: "actions",
      header: "",
      cell: (item: any) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleExpandItem(item.id);
            }}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-envio-gray-100 text-envio-gray-500"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedItem === item.id ? 'transform rotate-180' : ''}`} />
          </button>
          <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-envio-gray-100 text-envio-gray-500">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">Inventario de Equipos</h1>
              <p className="text-sm text-envio-gray-500">Gestiona los equipos de la organización</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-envio-red rounded-lg hover:bg-envio-red/90 focus:outline-none focus:ring-2 focus:ring-envio-red/50">
                <span>Añadir Equipo</span>
                <Plus className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Equipos registrados" 
              value="127"
              icon={<Laptop className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
              footer={
                <div className="flex items-center justify-between">
                  <span>Último mes</span>
                  <span className="font-medium">+15</span>
                </div>
              }
            />
            
            <StatCard 
              title="Dispositivos móviles" 
              value="43"
              icon={<Smartphone className="h-5 w-5" />}
              trend={{ value: 8, isPositive: true }}
              footer={
                <div className="flex items-center justify-between">
                  <span>Último mes</span>
                  <span className="font-medium">+5</span>
                </div>
              }
            />
            
            <StatCard 
              title="Servidores" 
              value="12"
              icon={<MonitorDown className="h-5 w-5" />}
              footer={
                <div className="flex items-center justify-between">
                  <span>Disponibilidad</span>
                  <span className="font-medium text-envio-green">99.9%</span>
                </div>
              }
            />
            
            <StatCard 
              title="Networking" 
              value="35"
              icon={<Router className="h-5 w-5" />}
              trend={{ value: 2, isPositive: false }}
              footer={
                <div className="flex items-center justify-between">
                  <span>Último registro</span>
                  <span className="font-medium flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    16-11-2025
                  </span>
                </div>
              }
            />
          </div>
          
          {/* Chart */}
          <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg">Histórico de Equipos</h3>
                <p className="text-envio-gray-500 text-sm">Crecimiento de inventario por mes</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-envio-blue"></div>
                  <span className="text-xs text-envio-gray-500">Desktop</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-envio-green"></div>
                  <span className="text-xs text-envio-gray-500">Laptop</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-envio-orange"></div>
                  <span className="text-xs text-envio-gray-500">Servidor</span>
                </div>
              </div>
            </div>
            
            <DataChart 
              data={chartData} 
              lines={[
                { dataKey: 'desktop', stroke: '#0A84FF', name: 'Desktop' },
                { dataKey: 'laptop', stroke: '#30D158', name: 'Laptop' },
                { dataKey: 'servidor', stroke: '#FF9F0A', name: 'Servidor' }
              ]}
              height={250}
              showLegend={false}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <SearchBar 
              placeholder="Buscar por el hostname" 
              onSearch={setSearchQuery}
            />
            
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={selectedSede}
                  onChange={(e) => setSelectedSede(e.target.value)}
                  className="appearance-none pl-3 pr-10 py-2 bg-white border border-envio-gray-200 rounded-lg focus:ring-2 focus:ring-envio-red/20 focus:border-envio-red text-sm outline-none"
                >
                  <option value="Todos">Todas las sedes</option>
                  <option value="Paquetería Express">Paquetería Express</option>
                  <option value="Sede Principal">Sede Principal</option>
                  <option value="Bodega Norte">Bodega Norte</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-envio-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="appearance-none pl-3 pr-10 py-2 bg-white border border-envio-gray-200 rounded-lg focus:ring-2 focus:ring-envio-red/20 focus:border-envio-red text-sm outline-none"
                >
                  <option value="Todos">Todas las áreas</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Administración">Administración</option>
                  <option value="Operaciones">Operaciones</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-envio-gray-400" />
                </div>
              </div>
              
              <button className="flex items-center px-3 py-2 text-sm text-envio-red border border-envio-red rounded-lg hover:bg-envio-red/5">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </button>
            </div>
          </div>
          
          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border">
            <DataTable 
              data={equiposData}
              columns={columns}
              selectedItems={selectedItems}
              onSelectItem={toggleSelectItem}
              showCheckboxes={true}
              onRowClick={(item) => toggleExpandItem(item.id)}
            />
            
            {/* Detail panel when expanded */}
            {expandedItem !== null && (
              <div className="p-4 bg-envio-gray-50 border-t animated-expand">
                {equiposData
                  .filter(item => item.id === expandedItem)
                  .map(item => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-envio-gray-500">Hostname</div>
                          <div className="font-medium">{item.hostname}</div>
                        </div>
                        <div>
                          <div className="text-xs text-envio-gray-500">MAC</div>
                          <div className="font-medium">{item.mac}</div>
                        </div>
                        <div>
                          <div className="text-xs text-envio-gray-500">IP</div>
                          <div className="font-medium">{item.ip}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-envio-gray-500">Procesador</div>
                          <div className="font-medium">{item.procesador}</div>
                        </div>
                        <div>
                          <div className="text-xs text-envio-gray-500">Memoria RAM</div>
                          <div className="font-medium">{item.memoriaRam}</div>
                        </div>
                        <div>
                          <div className="text-xs text-envio-gray-500">Disco Duro</div>
                          <div className="font-medium">{item.discoDuro} ({item.tipoDisco})</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-envio-gray-500">Marca</div>
                          <div className="font-medium">{item.marca}</div>
                        </div>
                        <div>
                          <div className="text-xs text-envio-gray-500">Referencia</div>
                          <div className="font-medium">{item.referencia}</div>
                        </div>
                        <div>
                          <div className="text-xs text-envio-gray-500">Serial</div>
                          <div className="font-medium">{item.serial}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-envio-gray-500">Tipo de Equipo</div>
                          <div className="font-medium">{item.tipoEquipo}</div>
                        </div>
                        <div>
                          <div className="text-xs text-envio-gray-500">Activo</div>
                          <div className="font-medium">{item.activo}</div>
                        </div>
                        <div>
                          <div className="text-xs text-envio-gray-500">Monitor</div>
                          <div className="font-medium">{item.monitor ? 'Sí' : 'No'}</div>
                        </div>
                      </div>
                      
                      <div className="col-span-full flex justify-end">
                        <button className="flex items-center px-3 py-2 text-sm border border-envio-gray-300 rounded-lg hover:bg-envio-gray-100 mr-2">
                          <BarChart2 className="h-4 w-4 mr-2" />
                          Ver historial
                        </button>
                        <button className="flex items-center px-3 py-2 text-sm text-white bg-envio-red rounded-lg hover:bg-envio-red/90">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar equipo
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            
            <Pagination 
              currentPage={currentPage} 
              totalPages={10} 
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Plus = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default Index;
