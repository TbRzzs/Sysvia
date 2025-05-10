
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AddEquipmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newEquipo: any;
  setNewEquipo: (equipo: any) => void;
  onSubmit: () => void;
}

export const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({
  open,
  onOpenChange,
  newEquipo,
  setNewEquipo,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Equipo</DialogTitle>
          <DialogDescription>
            Complete la información del equipo a registrar en el inventario.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Hostname</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.hostname}
              onChange={(e) => setNewEquipo({...newEquipo, hostname: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">IP</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.ip}
              onChange={(e) => setNewEquipo({...newEquipo, ip: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sede</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.sede}
              onChange={(e) => setNewEquipo({...newEquipo, sede: e.target.value})}
            >
              <option value="Paquetería Express">Paquetería Express</option>
              <option value="Sede Principal">Sede Principal</option>
              <option value="Bodega Norte">Bodega Norte</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Área</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.area}
              onChange={(e) => setNewEquipo({...newEquipo, area: e.target.value})}
            >
              <option value="Tecnología">Tecnología</option>
              <option value="Administración">Administración</option>
              <option value="Operaciones">Operaciones</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Responsable</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.responsable}
              onChange={(e) => setNewEquipo({...newEquipo, responsable: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">MAC</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.mac}
              onChange={(e) => setNewEquipo({...newEquipo, mac: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Equipo</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.tipoEquipo}
              onChange={(e) => setNewEquipo({...newEquipo, tipoEquipo: e.target.value})}
            >
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Servidor">Servidor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Marca</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.marca}
              onChange={(e) => setNewEquipo({...newEquipo, marca: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Referencia</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.referencia}
              onChange={(e) => setNewEquipo({...newEquipo, referencia: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Serial</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.serial}
              onChange={(e) => setNewEquipo({...newEquipo, serial: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Activo</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.activo}
              onChange={(e) => setNewEquipo({...newEquipo, activo: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Procesador</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.procesador}
              onChange={(e) => setNewEquipo({...newEquipo, procesador: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Memoria RAM</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.memoriaRam}
              onChange={(e) => setNewEquipo({...newEquipo, memoriaRam: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Disco Duro</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.discoDuro}
              onChange={(e) => setNewEquipo({...newEquipo, discoDuro: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo Disco</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.tipoDisco}
              onChange={(e) => setNewEquipo({...newEquipo, tipoDisco: e.target.value})}
            >
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
            </select>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox"
                checked={newEquipo.monitor}
                onChange={(e) => setNewEquipo({...newEquipo, monitor: e.target.checked})}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium">¿Tiene monitor?</span>
            </label>
          </div>

          {newEquipo.monitor && (
            <div className="col-span-2">
              <div className="border rounded-md p-4 mt-2">
                <div className="text-sm font-medium mb-3">Información del Monitor</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Marca</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md"
                      value={newEquipo.monitorInfo.marca}
                      onChange={(e) => setNewEquipo({
                        ...newEquipo, 
                        monitorInfo: {...newEquipo.monitorInfo, marca: e.target.value}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Activo</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md"
                      value={newEquipo.monitorInfo.activo}
                      onChange={(e) => setNewEquipo({
                        ...newEquipo, 
                        monitorInfo: {...newEquipo.monitorInfo, activo: e.target.value}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Serial</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md"
                      value={newEquipo.monitorInfo.serial}
                      onChange={(e) => setNewEquipo({
                        ...newEquipo, 
                        monitorInfo: {...newEquipo.monitorInfo, serial: e.target.value}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Estado</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={newEquipo.monitorInfo.estado}
                      onChange={(e) => setNewEquipo({
                        ...newEquipo, 
                        monitorInfo: {...newEquipo.monitorInfo, estado: e.target.value}
                      })}
                    >
                      <option value="Operativo">Operativo</option>
                      <option value="Dañado">Dañado</option>
                      <option value="En reparación">En reparación</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button type="submit" onClick={onSubmit} className="bg-envio-red hover:bg-envio-red/90">Guardar Equipo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
