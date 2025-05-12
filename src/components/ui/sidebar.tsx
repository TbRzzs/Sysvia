
import * as React from "react"
import { createContext, useContext, forwardRef, useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface SidebarContextValue {
  collapsed: boolean
  collapsedOnMobile: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  setCollapsedOnMobile: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLButtonElement>
  sidebarRef: React.RefObject<HTMLDivElement>
  sidebarId: string
  triggerId: string
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

function useSidebarContext(): SidebarContextValue {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider")
  }

  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultCollapsed?: boolean
  defaultCollapsedOnMobile?: boolean
}

function SidebarProvider({
  children,
  defaultCollapsed = false,
  defaultCollapsedOnMobile = true,
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [collapsedOnMobile, setCollapsedOnMobile] = useState(
    defaultCollapsedOnMobile
  )

  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const sidebarRef = React.useRef<HTMLDivElement>(null)

  const sidebarId = React.useId()
  const triggerId = React.useId()

  // Reset collapsed state when window is resized.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && !collapsedOnMobile) {
        setCollapsedOnMobile(true)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        collapsedOnMobile,
        setCollapsed,
        setCollapsedOnMobile,
        triggerRef,
        sidebarRef,
        sidebarId,
        triggerId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Sidebar
 * -----------------------------------------------------------------------------------------------*/

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, ...props }, forwardedRef) => {
    const {
      collapsed,
      collapsedOnMobile,
      sidebarRef,
      sidebarId,
      triggerId,
    } = useSidebarContext()

    return (
      <div
        ref={sidebarRef}
        id={sidebarId}
        aria-expanded={!collapsed}
        data-state={collapsed ? "closed" : "open"}
        className={cn(
          "h-full",
          "lg:relative lg:z-auto lg:transition-[width] lg:duration-300",
          collapsed ? "lg:w-[72px]" : "lg:w-[250px]",
          collapsedOnMobile && "inset-0 z-50 hidden",
          !collapsedOnMobile && "fixed inset-0 z-50",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex h-full flex-col gap-2 overflow-hidden bg-background pb-8",
            "absolute inset-0",
            "lg:static",
            "border-r"
          )}
        >
          <div ref={forwardedRef} className="flex h-full flex-col gap-2">
            {props.children}
          </div>
        </div>
        <div
          role="presentation"
          onClick={() => useSidebarContext().setCollapsedOnMobile(true)}
          className={cn(
            "absolute inset-0 z-[-1] backdrop-blur-sm",
            collapsedOnMobile && "hidden",
            "lg:hidden"
          )}
        />
      </div>
    )
  }
)

Sidebar.displayName = "Sidebar"

/* -------------------------------------------------------------------------------------------------
 * SidebarHeader
 * -----------------------------------------------------------------------------------------------*/

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-14 items-center px-4", className)}
        {...props}
      />
    )
  }
)

SidebarHeader.displayName = "SidebarHeader"

/* -------------------------------------------------------------------------------------------------
 * SidebarContent
 * -----------------------------------------------------------------------------------------------*/

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-auto px-2", className)}
        {...props}
      />
    )
  }
)

SidebarContent.displayName = "SidebarContent"

/* -------------------------------------------------------------------------------------------------
 * SidebarFooter
 * -----------------------------------------------------------------------------------------------*/

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("mt-auto", className)} {...props} />
  }
)

SidebarFooter.displayName = "SidebarFooter"

/* -------------------------------------------------------------------------------------------------
 * SidebarTrigger
 * -----------------------------------------------------------------------------------------------*/

interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, ...props }, forwardedRef) => {
    const { collapsed, setCollapsed, sidebarId } = useSidebarContext()

    return (
      <button
        ref={(node) => {
          // Fix for TypeScript read-only property error
          if (typeof forwardedRef === "function") forwardedRef(node)
          else if (forwardedRef) {
            // Use Object.defineProperty to set the current property
            if (node) {
              Object.defineProperty(forwardedRef, 'current', {
                value: node,
                writable: true,
                configurable: true
              })
            }
          }
        }}
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        aria-controls={sidebarId}
        aria-expanded={!collapsed}
        data-state={collapsed ? "closed" : "open"}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted",
          className
        )}
        {...props}
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 rotate-0 transition-transform",
            collapsed && "rotate-180"
          )}
          aria-hidden="true"
        />
        <span className="sr-only">Toggle sidebar</span>
      </button>
    )
  }
)

SidebarTrigger.displayName = "SidebarTrigger"

/* -------------------------------------------------------------------------------------------------
 * SidebarMobileTrigger
 * -----------------------------------------------------------------------------------------------*/

interface SidebarMobileTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const SidebarMobileTrigger = forwardRef<
  HTMLButtonElement,
  SidebarMobileTriggerProps
>(({ className, ...props }, forwardedRef) => {
  const {
    collapsedOnMobile,
    setCollapsedOnMobile,
    sidebarId,
    triggerId,
  } = useSidebarContext()

  return (
    <button
      ref={forwardedRef}
      type="button"
      onClick={() => setCollapsedOnMobile(!collapsedOnMobile)}
      aria-controls={sidebarId}
      aria-expanded={!collapsedOnMobile}
      id={triggerId}
      data-state={collapsedOnMobile ? "closed" : "open"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted",
        className
      )}
      {...props}
    >
      <ChevronRight
        className={cn(
          "h-4 w-4 rotate-0 transition-transform",
          !collapsedOnMobile && "rotate-180"
        )}
        aria-hidden="true"
      />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  )
})

SidebarMobileTrigger.displayName = "SidebarMobileTrigger"

/* -------------------------------------------------------------------------------------------------
 * SidebarGroup
 * -----------------------------------------------------------------------------------------------*/

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-1", className)} {...props} />
    )
  }
)

SidebarGroup.displayName = "SidebarGroup"

/* -------------------------------------------------------------------------------------------------
 * SidebarGroupLabel
 * -----------------------------------------------------------------------------------------------*/

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebarContext()

    return (
      <div
        ref={ref}
        className={cn(
          "mb-1 px-2 text-xs text-muted-foreground",
          collapsed && "lg:sr-only",
          className
        )}
        {...props}
      />
    )
  }
)

SidebarGroupLabel.displayName = "SidebarGroupLabel"

/* -------------------------------------------------------------------------------------------------
 * SidebarGroupContent
 * -----------------------------------------------------------------------------------------------*/

interface SidebarGroupContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroupContent = forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("space-y-1", className)} {...props} />
  }
)

SidebarGroupContent.displayName = "SidebarGroupContent"

/* -------------------------------------------------------------------------------------------------
 * SidebarMenu
 * -----------------------------------------------------------------------------------------------*/

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarMenu = forwardRef<HTMLDivElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("space-y-1", className)} {...props} />
  }
)

SidebarMenu.displayName = "SidebarMenu"

/* -------------------------------------------------------------------------------------------------
 * SidebarMenuItem
 * -----------------------------------------------------------------------------------------------*/

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarMenuItem = forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("", className)} {...props} />
  }
)

SidebarMenuItem.displayName = "SidebarMenuItem"

/* -------------------------------------------------------------------------------------------------
 * SidebarMenuButton
 * -----------------------------------------------------------------------------------------------*/

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const { collapsed } = useSidebarContext()
    const Comp = asChild ? React.Fragment : "button"
    const childProps = asChild ? {} : { ref, ...props }

    return (
      <Comp
        {...childProps}
        className={cn(
          "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-muted/50",
          collapsed && "lg:justify-center lg:gap-0",
          !asChild && className
        )}
      >
        {asChild ? (
          <SidebarMenuButtonContent 
            className={className} 
            // Fix for type mismatch
            {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}
          />
        ) : (
          props.children
        )}
      </Comp>
    )
  }
)

SidebarMenuButton.displayName = "SidebarMenuButton"

/* -------------------------------------------------------------------------------------------------
 * SidebarMenuButtonContent
 * -----------------------------------------------------------------------------------------------*/

interface SidebarMenuButtonContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarMenuButtonContent = forwardRef<
  HTMLDivElement,
  SidebarMenuButtonContentProps
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebarContext()

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-center gap-3",
        collapsed && "lg:justify-center lg:gap-0",
        className
      )}
      {...props}
    />
  )
})

SidebarMenuButtonContent.displayName = "SidebarMenuButtonContent"

export {
  SidebarProvider,
  useSidebarContext,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMobileTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuButtonContent,
}
