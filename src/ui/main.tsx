import {  StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Instagram, Twitter, Facebook } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/app-sidebar.tsx';
import { SocialMediaCardWithForm } from '../components/socialmedia-card'
// import { LoginCardWithForm } from '@/components/login-form';
// import{ CardWithDataImportForm } from '@/components/data-import-form';
import { DataTableDemo } from "@/components/data-table";
import {FormToAnalyze} from '@/components/form-analyze'
import{ CardWithDataImportForm } from '@/components/data-import-form'
import { FormToGenerateReport } from '@/components/form-generate-report';
import {LoginCardWithForm} from '@/components/login-form'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="flex items-center justify-center content-center h-screen">
      {/* <CardWithDataImportForm /> */}
      <LoginCardWithForm/> 
      {/* <div className="flex gap-4 content-center justify-center">
      <SocialMediaCardWithForm platform="instagram" Icon={Instagram} title="Instagram" />
      <SocialMediaCardWithForm platform="twitter" Icon={Twitter} title="Twitter" />
      <SocialMediaCardWithForm platform="facebook" Icon={Facebook} title="Facebook" />
      </div> */}
      <DataTableDemo/>      
      {/* <LoginCardWithForm /> */}
      {/* <CardWithDataImportForm /> */}
      {/* <FormToGenerateReport caseNumber={5666} platforms={["Facebook","Telegram", "Instagram", "Twitter"]} /> */}
      {/* <FormToAnalyze caseNumber={5666} platforms={["Facebook","Telegram", "Instagram", "Twitter"]} /> */}
      </main>
    </SidebarProvider>
  </StrictMode>,
)
