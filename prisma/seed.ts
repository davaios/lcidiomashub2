// prisma/seed.ts
// Database seed script for LCidiomas Sistema Integral

import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // ============================================
  // SEDES
  // ============================================
  console.log("📍 Creating sedes...")

  const sedeCentro = await prisma.sede.upsert({
    where: { codigo: "SEDE-001" },
    update: {},
    create: {
      codigo: "SEDE-001",
      nombre: "LCidiomas Centro",
      direccion: "Calle Mayor 15",
      ciudad: "Madrid",
      provincia: "Madrid",
      codigoPostal: "28013",
      telefono: "+34 91 123 4567",
      email: "centro@lcidiomas.com",
      horarioApertura: "09:00",
      horarioCierre: "21:00",
    },
  })

  const sedeNorte = await prisma.sede.upsert({
    where: { codigo: "SEDE-002" },
    update: {},
    create: {
      codigo: "SEDE-002",
      nombre: "LCidiomas Norte",
      direccion: "Avenida de la Paz 42",
      ciudad: "Madrid",
      provincia: "Madrid",
      codigoPostal: "28036",
      telefono: "+34 91 234 5678",
      email: "norte@lcidiomas.com",
      horarioApertura: "09:00",
      horarioCierre: "21:00",
    },
  })

  const sedeSur = await prisma.sede.upsert({
    where: { codigo: "SEDE-003" },
    update: {},
    create: {
      codigo: "SEDE-003",
      nombre: "LCidiomas Sur",
      direccion: "Plaza del Sol 8",
      ciudad: "Madrid",
      provincia: "Madrid",
      codigoPostal: "28045",
      telefono: "+34 91 345 6789",
      email: "sur@lcidiomas.com",
      horarioApertura: "09:00",
      horarioCierre: "21:00",
    },
  })

  // ============================================
  // AULAS
  // ============================================
  console.log("🏫 Creating aulas...")

  const aulasData = [
    { sede: sedeCentro, nombre: "Aula 1", codigo: "A1", capacidad: 12, tipo: "STANDARD" as const },
    { sede: sedeCentro, nombre: "Aula 2", codigo: "A2", capacidad: 10, tipo: "STANDARD" as const },
    { sede: sedeCentro, nombre: "Aula 3", codigo: "A3", capacidad: 8, tipo: "STANDARD" as const },
    { sede: sedeCentro, nombre: "Aula Multimedia", codigo: "AM1", capacidad: 15, tipo: "MULTIMEDIA" as const },
    { sede: sedeCentro, nombre: "Sala Reuniones", codigo: "SR1", capacidad: 6, tipo: "SALA_REUNIONES" as const },
    { sede: sedeNorte, nombre: "Aula 1", codigo: "A1", capacidad: 12, tipo: "STANDARD" as const },
    { sede: sedeNorte, nombre: "Aula 2", codigo: "A2", capacidad: 10, tipo: "STANDARD" as const },
    { sede: sedeNorte, nombre: "Laboratorio", codigo: "LAB1", capacidad: 8, tipo: "LABORATORIO" as const },
    { sede: sedeSur, nombre: "Aula 1", codigo: "A1", capacidad: 12, tipo: "STANDARD" as const },
    { sede: sedeSur, nombre: "Aula 2", codigo: "A2", capacidad: 10, tipo: "STANDARD" as const },
  ]

  for (const aula of aulasData) {
    await prisma.aula.upsert({
      where: { sedeId_codigo: { sedeId: aula.sede.id, codigo: aula.codigo } },
      update: {},
      create: {
        sedeId: aula.sede.id,
        nombre: aula.nombre,
        codigo: aula.codigo,
        capacidad: aula.capacidad,
        tipo: aula.tipo,
        equipamiento: ["Pizarra", "Proyector", "Wifi"],
      },
    })
  }

  // ============================================
  // USERS & EMPLEADOS
  // ============================================
  console.log("👥 Creating users and empleados...")

  const passwordHash = await hash("Admin123!", 12)

  // Admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@lcidiomas.com" },
    update: {},
    create: {
      email: "admin@lcidiomas.com",
      passwordHash,
      firstName: "Admin",
      lastName: "Sistema",
      role: "SUPER_ADMIN",
      phone: "+34 600 000 000",
      sedeId: sedeCentro.id,
    },
  })

  // Director
  const directorUser = await prisma.user.upsert({
    where: { email: "director@lcidiomas.com" },
    update: {},
    create: {
      email: "director@lcidiomas.com",
      passwordHash,
      firstName: "Carlos",
      lastName: "Martinez Lopez",
      role: "DIRECTOR",
      phone: "+34 600 111 111",
      sedeId: sedeCentro.id,
    },
  })

  await prisma.empleado.upsert({
    where: { userId: directorUser.id },
    update: {},
    create: {
      userId: directorUser.id,
      codigo: "EMP-001",
      sedeId: sedeCentro.id,
      departamento: "DIRECCION",
      puesto: "Director General",
      tipoContrato: "INDEFINIDO",
      fechaAlta: new Date("2020-01-01"),
      salarioBruto: 65000,
    },
  })

  // Coordinador Academico
  const coordUser = await prisma.user.upsert({
    where: { email: "coordinador@lcidiomas.com" },
    update: {},
    create: {
      email: "coordinador@lcidiomas.com",
      passwordHash,
      firstName: "Ana",
      lastName: "Garcia Fernandez",
      role: "COORDINADOR_ACADEMICO",
      phone: "+34 600 222 222",
      sedeId: sedeCentro.id,
    },
  })

  await prisma.empleado.upsert({
    where: { userId: coordUser.id },
    update: {},
    create: {
      userId: coordUser.id,
      codigo: "EMP-002",
      sedeId: sedeCentro.id,
      departamento: "ACADEMICO",
      puesto: "Coordinador Academico",
      tipoContrato: "INDEFINIDO",
      fechaAlta: new Date("2021-03-15"),
      salarioBruto: 42000,
    },
  })

  // Comercial
  const comercialUser = await prisma.user.upsert({
    where: { email: "comercial@lcidiomas.com" },
    update: {},
    create: {
      email: "comercial@lcidiomas.com",
      passwordHash,
      firstName: "Pedro",
      lastName: "Sanchez Ruiz",
      role: "COMERCIAL",
      phone: "+34 600 333 333",
      sedeId: sedeCentro.id,
    },
  })

  const comercialEmpleado = await prisma.empleado.upsert({
    where: { userId: comercialUser.id },
    update: {},
    create: {
      userId: comercialUser.id,
      codigo: "EMP-003",
      sedeId: sedeCentro.id,
      departamento: "COMERCIAL",
      puesto: "Asesor Comercial",
      tipoContrato: "INDEFINIDO",
      fechaAlta: new Date("2022-06-01"),
      salarioBruto: 28000,
    },
  })

  // Profesores
  const profesoresData = [
    { email: "maria.garcia@lcidiomas.com", firstName: "Maria", lastName: "Garcia Torres", idiomas: ["Ingles"], especialidades: ["Business English", "Cambridge"] },
    { email: "carlos.lopez@lcidiomas.com", firstName: "Carlos", lastName: "Lopez Hernandez", idiomas: ["Ingles", "Aleman"], especialidades: ["General English", "Conversacion"] },
    { email: "laura.fernandez@lcidiomas.com", firstName: "Laura", lastName: "Fernandez Diaz", idiomas: ["Frances"], especialidades: ["DELF", "Conversacion"] },
    { email: "john.smith@lcidiomas.com", firstName: "John", lastName: "Smith", idiomas: ["Ingles"], especialidades: ["IELTS", "TOEFL", "Ninos"] },
    { email: "anna.mueller@lcidiomas.com", firstName: "Anna", lastName: "Mueller", idiomas: ["Aleman"], especialidades: ["Goethe", "Business German"] },
  ]

  const profesores = []
  for (let i = 0; i < profesoresData.length; i++) {
    const p = profesoresData[i]
    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        email: p.email,
        passwordHash,
        firstName: p.firstName,
        lastName: p.lastName,
        role: "PROFESOR",
        phone: `+34 600 ${400 + i}${400 + i}${400 + i}`,
        sedeId: i < 3 ? sedeCentro.id : i < 4 ? sedeNorte.id : sedeSur.id,
      },
    })

    const profesor = await prisma.profesor.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        codigo: `PROF-${String(i + 1).padStart(3, "0")}`,
        especialidades: p.especialidades,
        idiomas: p.idiomas,
        certificaciones: ["CELTA", "DELTA"],
        biografia: `Profesor de ${p.idiomas.join(" y ")} con experiencia en ${p.especialidades.join(", ")}.`,
      },
    })

    profesores.push(profesor)
  }

  // ============================================
  // CURSOS
  // ============================================
  console.log("📚 Creating cursos...")

  const cursosData = [
    { codigo: "ING-A1", nombre: "Ingles A1 - Principiante", idioma: "Ingles", nivel: "A1" as const, duracion: 60, sesiones: 30, precio: 890 },
    { codigo: "ING-A2", nombre: "Ingles A2 - Elemental", idioma: "Ingles", nivel: "A2" as const, duracion: 60, sesiones: 30, precio: 890 },
    { codigo: "ING-B1", nombre: "Ingles B1 - Intermedio", idioma: "Ingles", nivel: "B1" as const, duracion: 80, sesiones: 40, precio: 1090 },
    { codigo: "ING-B2", nombre: "Ingles B2 - Intermedio Alto", idioma: "Ingles", nivel: "B2" as const, duracion: 80, sesiones: 40, precio: 1190 },
    { codigo: "ING-C1", nombre: "Ingles C1 - Avanzado", idioma: "Ingles", nivel: "C1" as const, duracion: 100, sesiones: 50, precio: 1450 },
    { codigo: "ALE-A1", nombre: "Aleman A1 - Principiante", idioma: "Aleman", nivel: "A1" as const, duracion: 60, sesiones: 30, precio: 950 },
    { codigo: "ALE-A2", nombre: "Aleman A2 - Elemental", idioma: "Aleman", nivel: "A2" as const, duracion: 60, sesiones: 30, precio: 950 },
    { codigo: "FRA-A1", nombre: "Frances A1 - Principiante", idioma: "Frances", nivel: "A1" as const, duracion: 60, sesiones: 30, precio: 890 },
    { codigo: "FRA-A2", nombre: "Frances A2 - Elemental", idioma: "Frances", nivel: "A2" as const, duracion: 60, sesiones: 30, precio: 890 },
    { codigo: "ING-BUS", nombre: "Business English", idioma: "Ingles", nivel: "B2" as const, duracion: 40, sesiones: 20, precio: 750 },
  ]

  const cursos = []
  for (const c of cursosData) {
    const curso = await prisma.curso.upsert({
      where: { codigo: c.codigo },
      update: {},
      create: {
        codigo: c.codigo,
        nombre: c.nombre,
        descripcion: `Curso de ${c.idioma} nivel ${c.nivel}. ${c.duracion} horas de formacion.`,
        idioma: c.idioma,
        nivel: c.nivel,
        duracionHoras: c.duracion,
        sesiones: c.sesiones,
        precioParticular: c.precio,
        precioEmpresa: c.precio * 1.2,
        precioColegio: c.precio * 0.85,
        materialesIncluidos: ["Libro de texto", "Workbook", "Acceso plataforma online"],
      },
    })
    cursos.push(curso)
  }

  // ============================================
  // GRUPOS
  // ============================================
  console.log("👨‍🏫 Creating grupos...")

  const gruposData = [
    { codigo: "B1-MJ-001", nombre: "Ingles B1 Martes/Jueves 18h", cursoIdx: 2, profesorIdx: 0, sede: sedeCentro, hora: "18:00", dias: [2, 4] },
    { codigo: "A2-LMV-002", nombre: "Ingles A2 L/M/V 10h", cursoIdx: 1, profesorIdx: 1, sede: sedeCentro, hora: "10:00", dias: [1, 3, 5] },
    { codigo: "C1-SS-003", nombre: "Ingles C1 Sabados 10h", cursoIdx: 4, profesorIdx: 0, sede: sedeCentro, hora: "10:00", dias: [6] },
    { codigo: "B2-MJ-004", nombre: "Ingles B2 Martes/Jueves 19h", cursoIdx: 3, profesorIdx: 3, sede: sedeNorte, hora: "19:00", dias: [2, 4] },
    { codigo: "A1-LMV-005", nombre: "Ingles A1 L/M/V 18h", cursoIdx: 0, profesorIdx: 1, sede: sedeCentro, hora: "18:00", dias: [1, 3, 5] },
    { codigo: "ALE-A1-001", nombre: "Aleman A1 Miercoles 17h", cursoIdx: 5, profesorIdx: 4, sede: sedeSur, hora: "17:00", dias: [3] },
    { codigo: "FRA-A1-001", nombre: "Frances A1 Viernes 19h", cursoIdx: 7, profesorIdx: 2, sede: sedeCentro, hora: "19:00", dias: [5] },
    { codigo: "BUS-EMP-001", nombre: "Business English Empresa", cursoIdx: 9, profesorIdx: 0, sede: sedeCentro, hora: "09:00", dias: [2, 4] },
  ]

  const grupos = []
  for (const g of gruposData) {
    const grupo = await prisma.grupo.upsert({
      where: { codigo: g.codigo },
      update: {},
      create: {
        codigo: g.codigo,
        nombre: g.nombre,
        cursoId: cursos[g.cursoIdx].id,
        sedeId: g.sede.id,
        profesorId: profesores[g.profesorIdx].id,
        tipo: g.codigo.includes("EMP") ? "EMPRESA" : "REGULAR",
        modalidad: "PRESENCIAL",
        horaInicio: g.hora,
        horaFin: `${parseInt(g.hora.split(":")[0]) + 1}:30`,
        diasSemana: g.dias,
        fechaInicio: new Date("2026-01-07"),
        fechaFin: new Date("2026-06-30"),
        estado: "EN_CURSO",
        plazasOcupadas: Math.floor(Math.random() * 8) + 4,
      },
    })
    grupos.push(grupo)
  }

  // ============================================
  // ALUMNOS
  // ============================================
  console.log("🎓 Creating alumnos...")

  const alumnosData = [
    { email: "carlos.rodriguez@email.com", firstName: "Carlos", lastName: "Rodriguez Martinez", nivel: "B1" as const },
    { email: "ana.lopez@email.com", firstName: "Ana", lastName: "Lopez Fernandez", nivel: "A2" as const },
    { email: "miguel.garcia@email.com", firstName: "Miguel", lastName: "Garcia Perez", nivel: "A1" as const },
    { email: "laura.martinez@email.com", firstName: "Laura", lastName: "Martinez Ruiz", nivel: "C1" as const },
    { email: "elena.fernandez@email.com", firstName: "Elena", lastName: "Fernandez Torres", nivel: "A1" as const },
    { email: "david.sanchez@email.com", firstName: "David", lastName: "Sanchez Gomez", nivel: "B2" as const },
    { email: "sofia.jimenez@email.com", firstName: "Sofia", lastName: "Jimenez Moreno", nivel: "A2" as const },
    { email: "pablo.ruiz@email.com", firstName: "Pablo", lastName: "Ruiz Diaz", nivel: "B1" as const },
    { email: "lucia.moreno@email.com", firstName: "Lucia", lastName: "Moreno Alvarez", nivel: "A1" as const },
    { email: "alberto.diaz@email.com", firstName: "Alberto", lastName: "Diaz Romero", nivel: "B2" as const },
    { email: "marta.alvarez@email.com", firstName: "Marta", lastName: "Alvarez Navarro", nivel: "A2" as const },
    { email: "sergio.romero@email.com", firstName: "Sergio", lastName: "Romero Gil", nivel: "C1" as const },
  ]

  const alumnos = []
  for (let i = 0; i < alumnosData.length; i++) {
    const a = alumnosData[i]
    const user = await prisma.user.upsert({
      where: { email: a.email },
      update: {},
      create: {
        email: a.email,
        passwordHash,
        firstName: a.firstName,
        lastName: a.lastName,
        role: "ALUMNO",
        phone: `+34 6${10 + i}${10 + i}${10 + i}${10 + i}${10 + i}`,
        sedeId: sedeCentro.id,
      },
    })

    const alumno = await prisma.alumno.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        codigo: `ALU-${String(i + 1).padStart(4, "0")}`,
        nivelActual: a.nivel,
        idiomasPrincipal: ["Ingles"],
        fechaNacimiento: new Date(1990 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        nacionalidad: "Espana",
        documentoTipo: "DNI",
        documentoNumero: `${12345678 + i}${String.fromCharCode(65 + i)}`,
        esMenor: false,
      },
    })

    alumnos.push(alumno)
  }

  // ============================================
  // LEADS
  // ============================================
  console.log("📈 Creating leads...")

  const leadsData = [
    { nombre: "Roberto", apellidos: "Gonzalez Vera", email: "roberto.gonzalez@email.com", segmento: "ADULTO_PARTICULAR" as const, estado: "NUEVO" as const, temp: "FRIO" as const },
    { nombre: "Carmen", apellidos: "Blazquez Luna", email: "carmen.blazquez@email.com", segmento: "ADULTO_PARTICULAR" as const, estado: "CONTACTADO" as const, temp: "TIBIO" as const },
    { nombre: "Fernando", apellidos: "Reyes Soto", email: "fernando.reyes@email.com", segmento: "EMPRESA" as const, estado: "TEST_REALIZADO" as const, temp: "CALIENTE" as const },
    { nombre: "Patricia", apellidos: "Mendez Cruz", email: "patricia.mendez@email.com", segmento: "ADULTO_PARTICULAR" as const, estado: "PROPUESTA_ENVIADA" as const, temp: "MUY_CALIENTE" as const },
    { nombre: "Jorge", apellidos: "Castro Vega", email: "jorge.castro@email.com", segmento: "NINO_PARTICULAR" as const, estado: "NEGOCIACION" as const, temp: "MUY_CALIENTE" as const },
    { nombre: "Isabel", apellidos: "Ortega Ramos", email: "isabel.ortega@email.com", segmento: "ADULTO_PARTICULAR" as const, estado: "CONTACTADO" as const, temp: "TIBIO" as const },
    { nombre: "Manuel", apellidos: "Guerrero Pena", email: "manuel.guerrero@email.com", segmento: "EMPRESA" as const, estado: "NUEVO" as const, temp: "FRIO" as const },
    { nombre: "Rosa", apellidos: "Delgado Flores", email: "rosa.delgado@email.com", segmento: "ADULTO_PARTICULAR" as const, estado: "TEST_REALIZADO" as const, temp: "CALIENTE" as const },
    { nombre: "Antonio", apellidos: "Fuentes Medina", email: "antonio.fuentes@email.com", segmento: "ADULTO_PARTICULAR" as const, estado: "CONTACTADO" as const, temp: "TIBIO" as const },
    { nombre: "Cristina", apellidos: "Herrera Vargas", email: "cristina.herrera@email.com", segmento: "NINO_PARTICULAR" as const, estado: "NUEVO" as const, temp: "FRIO" as const },
    { nombre: "Javier", apellidos: "Molina Castillo", email: "javier.molina@email.com", segmento: "ADULTO_PARTICULAR" as const, estado: "PROPUESTA_ENVIADA" as const, temp: "CALIENTE" as const },
    { nombre: "Beatriz", apellidos: "Rubio Santos", email: "beatriz.rubio@email.com", segmento: "EMPRESA" as const, estado: "NEGOCIACION" as const, temp: "MUY_CALIENTE" as const },
  ]

  for (const l of leadsData) {
    await prisma.lead.upsert({
      where: { id: l.email }, // Using email as unique identifier for upsert
      update: {},
      create: {
        nombre: l.nombre,
        apellidos: l.apellidos,
        email: l.email,
        telefono: `+34 6${Math.floor(Math.random() * 90000000 + 10000000)}`,
        segmento: l.segmento,
        origen: ["WEB_ORGANICO", "GOOGLE_ADS", "META_ADS", "REFERIDO"][Math.floor(Math.random() * 4)] as any,
        estado: l.estado,
        temperatura: l.temp,
        score: Math.floor(Math.random() * 80) + 20,
        comercialId: comercialEmpleado.id,
        idiomaInteres: "Ingles",
        horarioPreferido: ["Manana", "Tarde", "Noche"][Math.floor(Math.random() * 3)],
        proximoContacto: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
      },
    })
  }

  // ============================================
  // EMPRESAS
  // ============================================
  console.log("🏢 Creating empresas...")

  const empresasData = [
    { razon: "Tech Solutions SL", nif: "B12345678", contacto: "Maria Lopez" },
    { razon: "Global Services SA", nif: "A98765432", contacto: "Juan Martinez" },
    { razon: "Innovatech SL", nif: "B87654321", contacto: "Ana Garcia" },
  ]

  const empresas = []
  for (const e of empresasData) {
    const empresa = await prisma.empresa.upsert({
      where: { nif: e.nif },
      update: {},
      create: {
        razonSocial: e.razon,
        nombreComercial: e.razon.split(" ")[0],
        nif: e.nif,
        direccion: "Calle Empresarial 123",
        ciudad: "Madrid",
        codigoPostal: "28001",
        contactoNombre: e.contacto,
        contactoEmail: `${e.contacto.toLowerCase().replace(" ", ".")}@${e.razon.toLowerCase().split(" ")[0]}.com`,
        contactoTelefono: "+34 91 000 0000",
        fundaeActivo: true,
        creditoFundae: 5000,
      },
    })
    empresas.push(empresa)
  }

  // ============================================
  // MATRICULAS
  // ============================================
  console.log("📋 Creating matriculas...")

  for (let i = 0; i < 8; i++) {
    await prisma.matricula.upsert({
      where: { codigo: `MAT-2026-${String(i + 1).padStart(4, "0")}` },
      update: {},
      create: {
        codigo: `MAT-2026-${String(i + 1).padStart(4, "0")}`,
        alumnoId: alumnos[i].id,
        cursoId: cursos[i % cursos.length].id,
        sedeId: sedeCentro.id,
        fechaMatricula: new Date("2025-12-15"),
        fechaInicio: new Date("2026-01-07"),
        fechaFin: new Date("2026-06-30"),
        estado: "ACTIVA",
        importeBase: cursos[i % cursos.length].precioParticular.toNumber(),
        descuento: 0,
        importeFinal: cursos[i % cursos.length].precioParticular.toNumber(),
        formaPago: ["MENSUAL", "TRIMESTRAL", "DOMICILIACION"][i % 3] as any,
        cuotas: [9, 3, 9][i % 3],
        rgpdFirmado: true,
      },
    })
  }

  // ============================================
  // FACTURAS
  // ============================================
  console.log("🧾 Creating facturas...")

  const facturasData = [
    { serie: "A", numero: "F-2026-0001", alumnoIdx: 0, total: 145.20, estado: "COBRADA" as const },
    { serie: "A", numero: "F-2026-0002", alumnoIdx: 1, total: 571.73, estado: "ENVIADA" as const },
    { serie: "A", numero: "F-2026-0003", alumnoIdx: 2, total: 106.72, estado: "COBRADA" as const },
    { serie: "B", numero: "F-2026-0004", empresaIdx: 0, total: 4628.25, estado: "VENCIDA" as const },
    { serie: "A", numero: "F-2026-0005", alumnoIdx: 3, total: 1450, estado: "COBRADA" as const },
    { serie: "A", numero: "F-2026-0006", alumnoIdx: 4, total: 107.69, estado: "EMITIDA" as const },
    { serie: "B", numero: "F-2026-0007", empresaIdx: 1, total: 5445, estado: "ENVIADA" as const },
  ]

  for (const f of facturasData) {
    const baseImponible = f.total / 1.21
    const importeIVA = f.total - baseImponible

    await prisma.factura.upsert({
      where: { numero: f.numero },
      update: {},
      create: {
        numero: f.numero,
        serie: f.serie,
        alumnoId: f.alumnoIdx !== undefined ? alumnos[f.alumnoIdx].id : null,
        empresaId: f.empresaIdx !== undefined ? empresas[f.empresaIdx].id : null,
        nombreFiscal: f.alumnoIdx !== undefined
          ? `${alumnosData[f.alumnoIdx].firstName} ${alumnosData[f.alumnoIdx].lastName}`
          : empresasData[f.empresaIdx!].razon,
        nif: f.alumnoIdx !== undefined
          ? `${12345678 + f.alumnoIdx}${String.fromCharCode(65 + f.alumnoIdx)}`
          : empresasData[f.empresaIdx!].nif,
        direccionFiscal: "Calle Principal 1, Madrid",
        sedeId: sedeCentro.id,
        baseImponible: baseImponible,
        tipoIVA: 21,
        importeIVA: importeIVA,
        total: f.total,
        estado: f.estado,
        fechaEmision: new Date("2026-01-01"),
        fechaVencimiento: new Date("2026-01-15"),
        fechaCobro: f.estado === "COBRADA" ? new Date("2026-01-10") : null,
      },
    })
  }

  // ============================================
  // AGENT CONFIGS
  // ============================================
  console.log("🤖 Creating agent configs...")

  const agentsData = [
    { nombre: "LeadScorer", desc: "Evalua y puntua leads automaticamente", score: "A3" as const },
    { nombre: "TestEvaluator", desc: "Evalua tests de nivel con IA", score: "A2" as const },
    { nombre: "ScheduleOptimizer", desc: "Optimiza horarios de clases", score: "A2" as const },
    { nombre: "ResponseDrafter", desc: "Genera borradores de respuestas", score: "A1" as const },
    { nombre: "ReportGenerator", desc: "Genera informes automaticos", score: "A3" as const },
  ]

  for (const a of agentsData) {
    await prisma.agentConfig.upsert({
      where: { nombre: a.nombre },
      update: {},
      create: {
        nombre: a.nombre,
        descripcion: a.desc,
        scoreIA: a.score,
        modelo: "claude-sonnet-4-20250514",
        temperatura: 0.7,
        maxTokens: 4096,
        systemPrompt: `Eres el agente ${a.nombre} del sistema LCidiomas. ${a.desc}.`,
        maxEjecucionesDia: 1000,
        timeoutMs: 30000,
      },
    })
  }

  // ============================================
  // SLACK CHANNELS
  // ============================================
  console.log("💬 Creating MicroSlack channels...")

  const channelsData = [
    { nombre: "general", desc: "Canal general de la academia", tipo: "GENERAL" as const },
    { nombre: "anuncios", desc: "Anuncios oficiales", tipo: "ANUNCIOS" as const },
    { nombre: "academico", desc: "Equipo academico", tipo: "DEPARTAMENTO" as const },
    { nombre: "comercial", desc: "Equipo comercial", tipo: "DEPARTAMENTO" as const },
    { nombre: "sede-centro", desc: "Equipo Sede Centro", tipo: "SEDE" as const },
  ]

  for (const c of channelsData) {
    await prisma.slackChannel.upsert({
      where: { nombre: c.nombre },
      update: {},
      create: {
        nombre: c.nombre,
        descripcion: c.desc,
        tipo: c.tipo,
        esPrivado: c.tipo === "DEPARTAMENTO",
      },
    })
  }

  console.log("✅ Database seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
