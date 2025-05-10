
import React from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Pagination } from '@/components/pagination';
import { ChevronDown, MoreHorizontal, BarChart2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Equipo } from '@/services/equipmentService';
import { Skeleton } from '@/components/ui/skeleton';

interface EquipmentTableProps {
  data: Equipo[];
  loading: boolean;
  selectedItems: Equipo[];
  expandedItems: string[];
  onSelectItem: (item: Equipo) => void;
  toggleExpandItem: (id: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onEditEquipo: (equipo: Equipo) => void;
}

export const EquipmentTable: React.FC<EquipmentTableProps> = ({
  data,
  loading,
  selectedItems,
  expandedItems,
  onSelectItem,
  toggleExpandItem,
  currentPage,
  setCurrentPage,
  onEditEquipo,
}) => {
  const columns = [
    {
      id: "hostname",
      header: "Hostname",
      cell: (item: Equipo) => <div className="font-medium">{item.hostname}</div>,
      sortable: true,
    },
    {
      id: "ip",
      header: "IP",
      cell: (item: Equipo) => item.ip,
      sortable: true,
    },
    {
      id: "sede",
      header: "Sede",
      cell: (item: Equipo) => item.sede,
      sortable: true,
    },
    {
      id: "area",
      header: "Área",
      cell: (item: Equipo) => item.area,
      sortable: true,
    },
    {
      id: "responsable",
      header: "Responsable",
      cell: (item: Equipo) => item.responsable,
      sortable: true,
    },
    {
      id: "actions",
      header: "",
      cell: (item: Equipo) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleExpandItem(item.id);
            }}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-envio-gray-100 text-envio-gray-500"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedItems.includes(item.id) ? 'transform rotate-180' : ''}`} />
          </button>
          <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-envio-gray-100 text-envio-gray-500">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      ),
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border mb-6">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border mb-6">
      <DataTable 
        data={data}
        columns={columns}
        selectedItems={selectedItems}
        onSelectItem={onSelectItem}
        showCheckboxes={true}
        onRowClick={(item: Equipo) => toggleExpandItem(item.id)}
        renderExpandedRow={(item: Equipo) => (
          <div className="p-4 bg-envio-gray-50 border-t animated-expand">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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

              {item.monitor && item.monitorInfo && (
                <div className="col-span-full mt-2">
                  <div className="text-sm font-medium mb-2 border-b pb-1">Información del Monitor</div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-envio-gray-500">Marca</div>
                      <div className="font-medium">{item.monitorInfo?.marca}</div>
                    </div>
                    <div>
                      <div className="text-xs text-envio-gray-500">Activo</div>
                      <div className="font-medium">{item.monitorInfo?.activo}</div>
                    </div>
                    <div>
                      <div className="text-xs text-envio-gray-500">Serial</div>
                      <div className="font-medium">{item.monitorInfo?.serial}</div>
                    </div>
                    <div>
                      <div className="text-xs text-envio-gray-500">Estado</div>
                      <div className="font-medium">{item.monitorInfo?.estado}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="col-span-full flex justify-end">
                <Button 
                  variant="outline"
                  className="mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Ver historial
                </Button>
                <Button 
                  variant="default"
                  className="bg-envio-red hover:bg-envio-red/90 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditEquipo(item);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar equipo
                </Button>
              </div>
            </div>
          </div>
        )}
        expandedItems={expandedItems}
      />
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={Math.ceil(data.length / 10)} 
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
