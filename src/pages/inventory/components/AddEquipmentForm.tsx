
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Equipo } from '@/services/equipmentService';

interface AddEquipmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newEquipo: Partial<Equipo>;
  setNewEquipo: (equipo: Partial<Equipo>) => void;
  onSubmit: (equipo: Partial<Equipo>) => void;
  isEdit: boolean;
}

export const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({
  open,
  onOpenChange,
  newEquipo,
  setNewEquipo,
  onSubmit,
  isEdit
}) => {
  
  // Manejar cambios en los campos de texto y selección
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEquipo({
      ...newEquipo,
      [name]: value
    });
  };

  // Manejar cambios en el checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewEquipo({
      ...newEquipo,
      [name]: checked,
      ...(name === 'monitor' && !checked ? { monitorInfo: undefined } : {})
    });
  };

  // Manejar cambios en los campos del monitor
  const handleMonitorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEquipo({
      ...newEquipo,
      monitorInfo: {
        ...newEquipo.monitorInfo || {},
        [name]: value
      }
    });
  };

  // Inicializar monitorInfo si no existe y monitor es true
  useEffect(() => {
    if (newEquipo.monitor && !newEquipo.monitorInfo) {
      setNewEquipo({
        ...newEquipo,
        monitorInfo: {
          marca: '',
          activo: '',
          serial: '',
          estado: 'Operativo'
        }
      });
    }
  }, [newEquipo.monitor]);

  const handleSubmit = () => {
    onSubmit(newEquipo);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar Equipo' : 'Añadir Nuevo Equipo'}</DialogTitle>
          <DialogDescription>
            Complete la información del equipo a {isEdit ? 'actualizar' : 'registrar'} en el inventario.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Hostname</label>
            <input 
              type="text" 
              name="hostname"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.hostname || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">IP</label>
            <input 
              type="text" 
              name="ip"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.ip || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sede</label>
            <select 
              name="sede"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.sede || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="Paquetería Express">Paquetería Express</option>
              <option value="Sede Principal">Sede Principal</option>
              <option value="Bodega Norte">Bodega Norte</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Área</label>
            <select 
              name="area"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.area || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Administración">Administración</option>
              <option value="Operaciones">Operaciones</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Responsable</label>
            <input 
              type="text" 
              name="responsable"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.responsable || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">MAC</label>
            <input 
              type="text" 
              name="mac"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.mac || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Equipo</label>
            <select 
              name="tipoEquipo"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.tipoEquipo || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="Laptop">Laptop</option>
              <option value="Desktop">Desktop</option>
              <option value="Servidor">Servidor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Marca</label>
            <input 
              type="text" 
              name="marca"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.marca || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Referencia</label>
            <input 
              type="text" 
              name="referencia"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.referencia || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Serial</label>
            <input 
              type="text" 
              name="serial"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.serial || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Activo</label>
            <input 
              type="text" 
              name="activo"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.activo || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Procesador</label>
            <input 
              type="text" 
              name="procesador"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.procesador || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Memoria RAM</label>
            <input 
              type="text" 
              name="memoriaRam"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.memoriaRam || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Disco Duro</label>
            <input 
              type="text" 
              name="discoDuro"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.discoDuro || ''}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo Disco</label>
            <select 
              name="tipoDisco"
              className="w-full px-3 py-2 border rounded-md"
              value={newEquipo.tipoDisco || ''}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
            </select>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox"
                name="monitor"
                checked={newEquipo.monitor || false}
                onChange={handleCheckboxChange}
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
                      name="marca"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newEquipo.monitorInfo?.marca || ''}
                      onChange={handleMonitorChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Activo</label>
                    <input 
                      type="text" 
                      name="activo"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newEquipo.monitorInfo?.activo || ''}
                      onChange={handleMonitorChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Serial</label>
                    <input 
                      type="text" 
                      name="serial"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newEquipo.monitorInfo?.serial || ''}
                      onChange={handleMonitorChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Estado</label>
                    <select 
                      name="estado"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newEquipo.monitorInfo?.estado || 'Operativo'}
                      onChange={handleMonitorChange}
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
          <Button type="submit" onClick={handleSubmit} className="bg-envio-red hover:bg-envio-red/90">
            {isEdit ? 'Actualizar Equipo' : 'Guardar Equipo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
