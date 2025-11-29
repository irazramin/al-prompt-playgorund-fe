import { AppearanceForm } from "@/components/appearance-form"
import { SettingsSidebar } from "@/components/shared/sidebar/settings-sidebar"
import { Palette } from "lucide-react"

export default function AppearancePage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your profile and account settings</p>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <SettingsSidebar />
        <main className="flex-1">
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Palette className="h-4 w-4" />
              <span className="text-sm">Appearance settings</span>
            </div>
            <AppearanceForm />
          </div>
        </main>
      </div>
    </div>
  )
}
