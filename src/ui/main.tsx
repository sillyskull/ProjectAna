import {  StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Instagram, Twitter, Facebook } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/app-sidebar.tsx';
import { SocialMediaCardWithForm } from '../components/socialmedia-card'
// import { LoginCardWithForm } from '@/components/login-form';
import {DataTable} from "../components/data-table.tsx";
// import{ CardWithDataImportForm } from '@/components/data-import-form'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="flex items-center justify-center content-center h-screen">
      {/* <CardWithDataImportForm /> */}
      <div className="flex gap-4 content-center justify-center">
      <SocialMediaCardWithForm platform="instagram" Icon={Instagram} title="Instagram" />
      <SocialMediaCardWithForm platform="twitter" Icon={Twitter} title="Twitter" />
      <SocialMediaCardWithForm platform="facebook" Icon={Facebook} title="Facebook" />
      </div>
      
      {/* <LoginCardWithForm /> */}
      </main>
    </SidebarProvider>
  </StrictMode>,
)
